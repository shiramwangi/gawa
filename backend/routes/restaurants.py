from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.restaurant import Restaurant as RestaurantModel
from schemas.restaurant import Restaurant, RestaurantCreate
from utils.security import get_current_user, require_restaurant_owner

router = APIRouter()


@router.get("/", response_model=List[Restaurant])
def list_restaurants(db: Session = Depends(get_db)):
    items = db.query(RestaurantModel).filter(RestaurantModel.is_active == True).all()
    return [Restaurant(id=i.id, name=i.name) for i in items]


@router.post("/", response_model=Restaurant)
def create_restaurant(restaurant: RestaurantCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # Only restaurant owners can create
    if not current_user.is_restaurant_owner:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Restaurant owner required")
    db_rest = RestaurantModel(
        name=restaurant.name,
        address="",
        city="",
        owner_id=current_user.id,
        is_active=True,
    )
    db.add(db_rest)
    db.commit()
    db.refresh(db_rest)
    return Restaurant(id=db_rest.id, name=db_rest.name)
