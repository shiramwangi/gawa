from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from database import Base

class DeliveryStatus(str, enum.Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    FAILED = "failed"

class Delivery(Base):
    __tablename__ = "deliveries"
    
    id = Column(Integer, primary_key=True, index=True)
    delivery_reference = Column(String, unique=True, index=True, nullable=False)
    
    # Order relationship
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    order = relationship("Order")
    
    # Delivery person
    delivery_person_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    delivery_person = relationship("User")
    
    # Delivery details
    status = Column(Enum(DeliveryStatus), default=DeliveryStatus.PENDING)
    delivery_fee = Column(Float, nullable=False)
    
    # Location tracking
    pickup_address = Column(Text, nullable=False)
    delivery_address = Column(Text, nullable=False)
    current_location = Column(String, nullable=True)  # GPS coordinates
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    assigned_at = Column(DateTime(timezone=True), nullable=True)
    picked_up_at = Column(DateTime(timezone=True), nullable=True)
    delivered_at = Column(DateTime(timezone=True), nullable=True)
    
    # Delivery notes
    delivery_notes = Column(Text, nullable=True)
    customer_rating = Column(Integer, nullable=True)  # 1-5 stars
    customer_feedback = Column(Text, nullable=True)

