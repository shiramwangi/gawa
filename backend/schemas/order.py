from pydantic import BaseModel
from typing import List, Optional

class ContributionCreate(BaseModel):
    amount: float


class ContributionOut(BaseModel):
    id: int
    user_id: int
    amount: float
    status: str

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    meal_id: int
    target_amount: float
    deadline_minutes: Optional[int] = 60

class OrderOut(BaseModel):
    id: int
    meal_id: int
    target_amount: float
    current_amount: float
    status: str
    delivery_address: Optional[str] = None
    delivery_phone: Optional[str] = None
    delivery_instructions: Optional[str] = None
    contributions: List[ContributionOut] = []

    class Config:
        from_attributes = True
