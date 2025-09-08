from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.meal import Meal as MealModel
from models.restaurant import Restaurant
from schemas.meal import Meal, MealCreate
from utils.security import get_current_user

router = APIRouter()


@router.get("/", response_model=List[Meal])
def list_meals(db: Session = Depends(get_db)):
    items = db.query(MealModel).filter(MealModel.is_available == True).all()
    return [Meal(id=i.id, restaurant_id=i.restaurant_id, name=i.name, price=i.price) for i in items]


@router.post("/", response_model=Meal)
def create_meal(meal: MealCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # Only restaurant owners can create meals for their restaurants
    rest = db.query(Restaurant).filter(Restaurant.id == meal.restaurant_id).first()
    if not rest:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    if rest.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not restaurant owner")
    db_meal = MealModel(
        restaurant_id=meal.restaurant_id,
        name=meal.name,
        price=meal.price,
        is_available=True,
    )
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return Meal(id=db_meal.id, restaurant_id=db_meal.restaurant_id, name=db_meal.name, price=db_meal.price)
