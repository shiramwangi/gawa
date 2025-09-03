from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MealBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    preparation_time: Optional[int] = None

class MealCreate(MealBase):
    restaurant_id: int

class MealUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    preparation_time: Optional[int] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None

class MealInDB(MealBase):
    id: int
    restaurant_id: int
    is_available: bool
    is_featured: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Meal(MealInDB):
    pass
