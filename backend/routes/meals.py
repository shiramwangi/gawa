from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.meal import Meal
from models.restaurant import Restaurant
from models.user import User
from schemas.meal import MealCreate, MealUpdate, Meal as MealSchema
from utils.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[MealSchema])
async def get_meals(
    skip: int = 0, 
    limit: int = 100, 
    restaurant_id: int = None,
    db: Session = Depends(get_db)
):
    """Get all available meals, optionally filtered by restaurant."""
    query = db.query(Meal).filter(Meal.is_available == True)
    
    if restaurant_id:
        query = query.filter(Meal.restaurant_id == restaurant_id)
    
    meals = query.offset(skip).limit(limit).all()
    return meals

@router.get("/{meal_id}", response_model=MealSchema)
async def get_meal(
    meal_id: int, 
    db: Session = Depends(get_db)
):
    """Get a specific meal by ID."""
    meal = db.query(Meal).filter(Meal.id == meal_id).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    return meal

@router.post("/", response_model=MealSchema)
async def create_meal(
    meal: MealCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new meal."""
    # Check if restaurant exists and user owns it
    restaurant = db.query(Restaurant).filter(Restaurant.id == meal.restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db_meal = Meal(**meal.dict())
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal

@router.put("/{meal_id}", response_model=MealSchema)
async def update_meal(
    meal_id: int,
    meal_update: MealUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update meal information."""
    meal = db.query(Meal).filter(Meal.id == meal_id).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    
    # Check if user owns the restaurant
    restaurant = db.query(Restaurant).filter(Restaurant.id == meal.restaurant_id).first()
    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update only provided fields
    update_data = meal_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(meal, field, value)
    
    db.commit()
    db.refresh(meal)
    return meal

@router.delete("/{meal_id}")
async def delete_meal(
    meal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a meal."""
    meal = db.query(Meal).filter(Meal.id == meal_id).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    
    # Check if user owns the restaurant
    restaurant = db.query(Restaurant).filter(Restaurant.id == meal.restaurant_id).first()
    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db.delete(meal)
    db.commit()
    return {"message": "Meal deleted successfully"}
