from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .payment import PaymentStatus, PaymentMethod

class OrderItemBase(BaseModel):
    meal_id: int
    quantity: int
    special_instructions: Optional[str] = None

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemInDB(OrderItemBase):
    id: int
    order_id: int
    unit_price: float
    total_price: float

    class Config:
        from_attributes = True

class OrderItem(OrderItemInDB):
    meal: Optional["Meal"] = None

class OrderBase(BaseModel):
    delivery_address: str
    delivery_phone: Optional[str] = None
    delivery_instructions: Optional[str] = None

class OrderCreate(OrderBase):
    restaurant_id: int
    order_items: List[OrderItemCreate]

class OrderUpdate(BaseModel):
    status: Optional[PaymentStatus] = None
    delivery_person_id: Optional[int] = None
    delivery_address: Optional[str] = None
    delivery_phone: Optional[str] = None
    delivery_instructions: Optional[str] = None

class OrderInDB(OrderBase):
    id: int
    order_number: str
    customer_id: int
    restaurant_id: int
    delivery_person_id: Optional[int] = None
    status: PaymentStatus
    subtotal: float
    delivery_fee: float
    tax: float
    total_amount: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    estimated_delivery_time: Optional[datetime] = None
    delivered_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Order(OrderInDB):
    order_items: List[OrderItem] = []
    customer: Optional["User"] = None
    restaurant: Optional["Restaurant"] = None
    delivery_person: Optional["User"] = None
    payment: Optional["Payment"] = None
