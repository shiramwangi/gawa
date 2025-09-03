from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from database import Base

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class PaymentMethod(str, enum.Enum):
    MPESA = "mpesa"
    CASH = "cash"
    CARD = "card"

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    payment_reference = Column(String, unique=True, index=True, nullable=False)
    
    # Order relationship
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    order = relationship("Order")
    
    # Payment details
    amount = Column(Float, nullable=False)
    currency = Column(String, default="KES")
    payment_method = Column(Enum(PaymentMethod), nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    
    # M-Pesa specific fields
    mpesa_receipt_number = Column(String, nullable=True)
    mpesa_transaction_id = Column(String, nullable=True)
    mpesa_phone_number = Column(String, nullable=True)
    
    # Card specific fields
    card_last_four = Column(String, nullable=True)
    card_brand = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Additional information
    failure_reason = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
