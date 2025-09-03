from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class DeliveryStatus(str, Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    FAILED = "failed"

class DeliveryBase(BaseModel):
    delivery_fee: float
    pickup_address: str
    delivery_address: str
    delivery_notes: Optional[str] = None

class DeliveryCreate(DeliveryBase):
    order_id: int

class DeliveryUpdate(BaseModel):
    status: Optional[DeliveryStatus] = None
    delivery_person_id: Optional[int] = None
    current_location: Optional[str] = None
    delivery_notes: Optional[str] = None
    customer_rating: Optional[int] = None
    customer_feedback: Optional[str] = None

class DeliveryInDB(DeliveryBase):
    id: int
    delivery_reference: str
    order_id: int
    delivery_person_id: Optional[int] = None
    status: DeliveryStatus
    current_location: Optional[str] = None
    created_at: datetime
    assigned_at: Optional[datetime] = None
    picked_up_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    customer_rating: Optional[int] = None
    customer_feedback: Optional[str] = None

    class Config:
        from_attributes = True

class Delivery(DeliveryInDB):
    order: Optional["Order"] = None
    delivery_person: Optional["User"] = None
