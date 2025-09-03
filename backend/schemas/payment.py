from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class PaymentStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class PaymentMethod(str, Enum):
    MPESA = "mpesa"
    CASH = "cash"
    CARD = "card"

class PaymentBase(BaseModel):
    amount: float
    currency: str = "KES"
    payment_method: PaymentMethod

class PaymentCreate(PaymentBase):
    order_id: int
    mpesa_phone_number: Optional[str] = None

class PaymentUpdate(BaseModel):
    status: Optional[PaymentStatus] = None
    mpesa_receipt_number: Optional[str] = None
    mpesa_transaction_id: Optional[str] = None
    card_last_four: Optional[str] = None
    card_brand: Optional[str] = None
    failure_reason: Optional[str] = None
    notes: Optional[str] = None

class PaymentInDB(PaymentBase):
    id: int
    payment_reference: str
    order_id: int
    status: PaymentStatus
    mpesa_receipt_number: Optional[str] = None
    mpesa_transaction_id: Optional[str] = None
    mpesa_phone_number: Optional[str] = None
    card_last_four: Optional[str] = None
    card_brand: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    failure_reason: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True

class Payment(PaymentInDB):
    order: Optional["Order"] = None

class STKPushRequest(BaseModel):
    phone_number: str
    amount: float
    order_id: int

class STKPushResponse(BaseModel):
    success: bool
    message: str
    payment_reference: str
