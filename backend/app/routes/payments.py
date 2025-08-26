from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.post("/stkpush")
async def stkpush(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Trigger an M-Pesa STK push to the user's phone."""
    return {"message": "STK push initiated", "payment_id": 1}

@router.post("/callback")
async def mpesa_callback(request: Request):
    """Handle M-Pesa payment confirmation callback (no auth)."""
    payload = await request.json()
    return {"status": "received", "payload": payload}

@router.get("/{payment_id}")
async def get_payment(payment_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Check payment status by ID."""
    return {"payment": {"id": payment_id, "status": "pending"}}
