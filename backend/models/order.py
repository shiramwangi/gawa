from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from database import Base

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    READY = "ready"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True, nullable=False)
    
    # Customer information
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    customer = relationship("User", foreign_keys=[customer_id])
    
    # Restaurant information
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    restaurant = relationship("Restaurant")
    
    # Delivery information
    delivery_person_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    delivery_person = relationship("User", foreign_keys=[delivery_person_id])
    
    # Order details
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    subtotal = Column(Float, nullable=False)
    delivery_fee = Column(Float, default=0.0)
    tax = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    
    # Delivery address
    delivery_address = Column(Text, nullable=False)
    delivery_phone = Column(String, nullable=True)
    delivery_instructions = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    estimated_delivery_time = Column(DateTime(timezone=True), nullable=True)
    delivered_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    order_items = relationship("OrderItem")
    payment = relationship("Payment", uselist=False)

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    meal_id = Column(Integer, ForeignKey("meals.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    
    # Special instructions for this item
    special_instructions = Column(Text, nullable=True)
    
    # Relationships
    order = relationship("Order")
    meal = relationship("Meal")
