from typing import Optional
from sqlalchemy.orm import Session
from models.payment import Payment, PaymentStatus, PaymentMethod
from models.order import Order
from schemas.payment import PaymentCreate, PaymentUpdate
from datetime import datetime
import uuid
import requests
import os

def create_payment(db: Session, payment: PaymentCreate) -> Payment:
    """Create a new payment record."""
    # Generate unique payment reference
    payment_reference = f"PAY-{uuid.uuid4().hex[:8].upper()}"
    
    db_payment = Payment(
        payment_reference=payment_reference,
        order_id=payment.order_id,
        amount=payment.amount,
        currency=payment.currency,
        payment_method=payment.payment_method,
        status=PaymentStatus.PENDING,
        mpesa_phone_number=payment.mpesa_phone_number
    )
    
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payment(db: Session, payment_id: int) -> Optional[Payment]:
    """Get a payment by ID."""
    return db.query(Payment).filter(Payment.id == payment_id).first()

def get_payment_by_reference(db: Session, payment_reference: str) -> Optional[Payment]:
    """Get a payment by reference."""
    return db.query(Payment).filter(Payment.payment_reference == payment_reference).first()

def update_payment_status(db: Session, payment_id: int, status: PaymentStatus, **kwargs) -> Optional[Payment]:
    """Update payment status and related information."""
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if payment:
        payment.status = status
        if status == PaymentStatus.COMPLETED:
            payment.completed_at = datetime.utcnow()
        
        # Update additional fields if provided
        for key, value in kwargs.items():
            if hasattr(payment, key):
                setattr(payment, key, value)
        
        db.commit()
        db.refresh(payment)
    return payment

def initiate_mpesa_stk_push(db: Session, payment_id: int, phone_number: str) -> dict:
    """Initiate M-Pesa STK push payment."""
    payment = get_payment(db, payment_id)
    if not payment:
        return {"success": False, "message": "Payment not found"}
    
    if payment.payment_method != PaymentMethod.MPESA:
        return {"success": False, "message": "Payment method is not M-Pesa"}
    
    # Update payment status
    update_payment_status(db, payment_id, PaymentStatus.PROCESSING)
    
    # Here you would integrate with actual M-Pesa API
    # For now, we'll simulate the process
    try:
        # Simulate M-Pesa API call
        # In real implementation, you would:
        # 1. Generate access token
        # 2. Make STK push request
        # 3. Handle response
        
        return {
            "success": True,
            "message": "STK push initiated successfully",
            "payment_reference": payment.payment_reference,
            "checkout_request_id": f"ws_CO_{uuid.uuid4().hex[:10]}"
        }
    except Exception as e:
        update_payment_status(db, payment_id, PaymentStatus.FAILED, failure_reason=str(e))
        return {"success": False, "message": f"STK push failed: {str(e)}"}

def handle_mpesa_callback(db: Session, callback_data: dict) -> dict:
    """Handle M-Pesa payment callback."""
    try:
        # Extract payment information from callback
        checkout_request_id = callback_data.get("Body", {}).get("stkCallback", {}).get("CheckoutRequestID")
        result_code = callback_data.get("Body", {}).get("stkCallback", {}).get("ResultCode")
        
        if result_code == 0:  # Success
            # Extract receipt number and transaction ID
            callback_metadata = callback_data.get("Body", {}).get("stkCallback", {}).get("CallbackMetadata", {}).get("Item", [])
            
            receipt_number = None
            transaction_id = None
            
            for item in callback_metadata:
                if item.get("Name") == "MpesaReceiptNumber":
                    receipt_number = item.get("Value")
                elif item.get("Name") == "TransactionDate":
                    transaction_id = item.get("Value")
            
            # Find payment by checkout request ID (you'd need to store this)
            # For now, we'll update the first pending payment
            payment = db.query(Payment).filter(
                Payment.status == PaymentStatus.PROCESSING,
                Payment.payment_method == PaymentMethod.MPESA
            ).first()
            
            if payment:
                update_payment_status(
                    db, 
                    payment.id, 
                    PaymentStatus.COMPLETED,
                    mpesa_receipt_number=receipt_number,
                    mpesa_transaction_id=str(transaction_id)
                )
                
                # Update order status
                order = db.query(Order).filter(Order.id == payment.order_id).first()
                if order:
                    order.status = "confirmed"
                    db.commit()
                
                return {"status": "success", "message": "Payment processed successfully"}
        
        return {"status": "failed", "message": "Payment failed"}
    
    except Exception as e:
        return {"status": "error", "message": f"Callback processing failed: {str(e)}"}

