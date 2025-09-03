from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Meal(Base):
    __tablename__ = "meals"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    image_url = Column(String, nullable=True)
    
    # Meal details
    category = Column(String, nullable=True)  # e.g., "Main Course", "Dessert", "Beverage"
    ingredients = Column(Text, nullable=True)
    allergens = Column(Text, nullable=True)
    preparation_time = Column(Integer, nullable=True)  # in minutes
    
    # Status
    is_available = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    
    # Restaurant relationship
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)
    restaurant = relationship("Restaurant")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    order_items = relationship("OrderItem")
