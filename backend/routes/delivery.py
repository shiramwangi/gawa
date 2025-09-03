from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.user import User
from schemas.delivery import DeliveryCreate, DeliveryUpdate, Delivery as DeliverySchema
from services.delivery_service import (
    create_delivery, get_delivery, get_deliveries_by_status,
    get_deliveries_by_delivery_person, assign_delivery_person,
    update_delivery_status, get_available_delivery_persons
)
from utils.security import get_current_user

router = APIRouter()

@router.post("/", response_model=DeliverySchema)
async def create_new_delivery(
    delivery: DeliveryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new delivery."""
    return create_delivery(db=db, delivery=delivery)

@router.get("/", response_model=List[DeliverySchema])
async def get_deliveries(
    status: str = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get deliveries."""
    if current_user.is_delivery_person:
        # Delivery person - get their assigned deliveries
        return get_deliveries_by_delivery_person(db, current_user.id, skip, limit)
    else:
        # Admin or restaurant owner - get deliveries by status
        if status:
            from models.delivery import DeliveryStatus
            try:
                delivery_status = DeliveryStatus(status)
                return get_deliveries_by_status(db, delivery_status, skip, limit)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid status")
        else:
            # Get all deliveries (simplified)
            from models.delivery import Delivery
            return db.query(Delivery).offset(skip).limit(limit).all()

@router.get("/{delivery_id}", response_model=DeliverySchema)
async def get_delivery_by_id(
    delivery_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific delivery by ID."""
    delivery = get_delivery(db, delivery_id)
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")
    
    # Check permissions
    if (current_user.is_delivery_person and 
        delivery.delivery_person_id != current_user.id):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return delivery

@router.put("/{delivery_id}/assign", response_model=DeliverySchema)
async def assign_delivery(
    delivery_id: int,
    delivery_person_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Assign a delivery person to a delivery."""
    # Check if user is admin or restaurant owner
    if not (current_user.is_restaurant_owner or current_user.is_delivery_person):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    delivery = assign_delivery_person(db, delivery_id, delivery_person_id)
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")
    
    return delivery

@router.put("/{delivery_id}/status", response_model=DeliverySchema)
async def update_delivery_status_endpoint(
    delivery_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update delivery status."""
    from models.delivery import DeliveryStatus
    
    try:
        delivery_status = DeliveryStatus(status)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    # Check permissions
    delivery = get_delivery(db, delivery_id)
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")
    
    if (current_user.is_delivery_person and 
        delivery.delivery_person_id != current_user.id):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_delivery = update_delivery_status(db, delivery_id, delivery_status)
    if not updated_delivery:
        raise HTTPException(status_code=400, detail="Failed to update delivery")
    
    return updated_delivery

@router.get("/available/delivery-persons")
async def get_available_delivery_persons_list(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get available delivery persons."""
    # Check if user is admin or restaurant owner
    if not current_user.is_restaurant_owner:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    delivery_persons = get_available_delivery_persons(db)
    return [{"id": person.id, "name": person.full_name, "phone": person.phone_number} for person in delivery_persons]
