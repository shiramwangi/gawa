from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class RestaurantBase(BaseModel):
    name: str
    description: Optional[str] = None
    address: str
    city: str
    phone_number: Optional[str] = None
    email: Optional[str] = None
    cuisine_type: Optional[str] = None
    delivery_fee: float = 0.0
    minimum_order: float = 0.0
    delivery_time: Optional[str] = None

class RestaurantCreate(RestaurantBase):
    owner_id: int

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    cuisine_type: Optional[str] = None
    delivery_fee: Optional[float] = None
    minimum_order: Optional[float] = None
    delivery_time: Optional[str] = None
    is_active: Optional[bool] = None

class RestaurantInDB(RestaurantBase):
    id: int
    owner_id: int
    is_active: bool
    is_verified: bool
    rating: float
    total_reviews: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Restaurant(RestaurantInDB):
    pass

class RestaurantWithMeals(Restaurant):
    meals: List["Meal"] = []
