from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.restaurant import Restaurant
from models.user import User
from schemas.restaurant import RestaurantCreate, RestaurantUpdate, Restaurant as RestaurantSchema
from utils.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[RestaurantSchema])
async def get_restaurants(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all active restaurants."""
    restaurants = db.query(Restaurant).filter(Restaurant.is_active == True).offset(skip).limit(limit).all()
    return restaurants

@router.get("/{restaurant_id}", response_model=RestaurantSchema)
async def get_restaurant(
    restaurant_id: int, 
    db: Session = Depends(get_db)
):
    """Get a specific restaurant by ID."""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@router.post("/", response_model=RestaurantSchema)
async def create_restaurant(
    restaurant: RestaurantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new restaurant."""
    # Check if user is restaurant owner
    if not current_user.is_restaurant_owner:
        raise HTTPException(status_code=403, detail="User is not a restaurant owner")
    
    db_restaurant = Restaurant(**restaurant.dict())
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

@router.put("/{restaurant_id}", response_model=RestaurantSchema)
async def update_restaurant(
    restaurant_id: int,
    restaurant_update: RestaurantUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update restaurant information."""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Check if user owns this restaurant
    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update only provided fields
    update_data = restaurant_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(restaurant, field, value)
    
    db.commit()
    db.refresh(restaurant)
    return restaurant

@router.delete("/{restaurant_id}")
async def delete_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a restaurant."""
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Check if user owns this restaurant
    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db.delete(restaurant)
    db.commit()
    return {"message": "Restaurant deleted successfully"}
