from pydantic import BaseModel

class MealCreate(BaseModel):
    restaurant_id: int
    name: str
    price: float

class Meal(BaseModel):
    id: int
    restaurant_id: int
    name: str
    price: float
