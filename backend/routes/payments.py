from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.payment import PaymentCreate, PaymentUpdate, Payment as PaymentSchema, STKPushRequest, STKPushResponse
from services.payment_service import (
    create_payment, get_payment, update_payment_status, 
    initiate_mpesa_stk_push, handle_mpesa_callback
)
from utils.security import get_current_user

router = APIRouter()

@router.post("/", response_model=PaymentSchema)
async def create_new_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new payment."""
    return create_payment(db=db, payment=payment)

@router.get("/{payment_id}", response_model=PaymentSchema)
async def get_payment_by_id(
    payment_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific payment by ID."""
    payment = get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # Check if user has permission to view this payment
    if payment.order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return payment

@router.post("/stkpush", response_model=STKPushResponse)
async def stk_push(
    stk_request: STKPushRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Initiate M-Pesa STK push payment."""
    # Create payment first
    payment_data = PaymentCreate(
        order_id=stk_request.order_id,
        amount=stk_request.amount,
        payment_method="mpesa",
        mpesa_phone_number=stk_request.phone_number
    )
    
    payment = create_payment(db=db, payment=payment_data)
    
    # Initiate STK push
    result = initiate_mpesa_stk_push(db, payment.id, stk_request.phone_number)
    
    return STKPushResponse(
        success=result["success"],
        message=result["message"],
        payment_reference=payment.payment_reference
    )

@router.post("/callback")
async def mpesa_callback(request: Request, db: Session = Depends(get_db)):
    """Handle M-Pesa payment confirmation callback (no auth)."""
    try:
        payload = await request.json()
        result = handle_mpesa_callback(db, payload)
        return result
    except Exception as e:
        return {"status": "error", "message": f"Callback processing failed: {str(e)}"}

@router.put("/{payment_id}", response_model=PaymentSchema)
async def update_payment(
    payment_id: int,
    payment_update: PaymentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update payment information."""
    payment = get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # Check if user has permission to update this payment
    if payment.order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update payment
    update_data = payment_update.dict(exclude_unset=True)
    updated_payment = update_payment_status(db, payment_id, **update_data)
    
    if not updated_payment:
        raise HTTPException(status_code=400, detail="Failed to update payment")
    
    return updated_payment
