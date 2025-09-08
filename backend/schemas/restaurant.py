from pydantic import BaseModel

class RestaurantCreate(BaseModel):
    name: str

class Restaurant(BaseModel):
    id: int
    name: str
