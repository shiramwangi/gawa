from typing import List, Optional
from sqlalchemy.orm import Session
from models.delivery import Delivery, DeliveryStatus
from models.user import User
from models.order import Order
from schemas.delivery import DeliveryCreate, DeliveryUpdate
from datetime import datetime
import uuid

def create_delivery(db: Session, delivery: DeliveryCreate) -> Delivery:
    """Create a new delivery record."""
    # Generate unique delivery reference
    delivery_reference = f"DEL-{uuid.uuid4().hex[:8].upper()}"
    
    db_delivery = Delivery(
        delivery_reference=delivery_reference,
        order_id=delivery.order_id,
        delivery_fee=delivery.delivery_fee,
        pickup_address=delivery.pickup_address,
        delivery_address=delivery.delivery_address,
        status=DeliveryStatus.PENDING,
        delivery_notes=delivery.delivery_notes
    )
    
    db.add(db_delivery)
    db.commit()
    db.refresh(db_delivery)
    return db_delivery

def get_delivery(db: Session, delivery_id: int) -> Optional[Delivery]:
    """Get a delivery by ID."""
    return db.query(Delivery).filter(Delivery.id == delivery_id).first()

def get_deliveries_by_status(db: Session, status: DeliveryStatus, skip: int = 0, limit: int = 100) -> List[Delivery]:
    """Get deliveries by status."""
    return db.query(Delivery).filter(Delivery.status == status).offset(skip).limit(limit).all()

def get_deliveries_by_delivery_person(db: Session, delivery_person_id: int, skip: int = 0, limit: int = 100) -> List[Delivery]:
    """Get deliveries assigned to a specific delivery person."""
    return db.query(Delivery).filter(Delivery.delivery_person_id == delivery_person_id).offset(skip).limit(limit).all()

def assign_delivery_person(db: Session, delivery_id: int, delivery_person_id: int) -> Optional[Delivery]:
    """Assign a delivery person to a delivery."""
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if delivery:
        delivery.delivery_person_id = delivery_person_id
        delivery.status = DeliveryStatus.ASSIGNED
        delivery.assigned_at = datetime.utcnow()
        db.commit()
        db.refresh(delivery)
    return delivery

def update_delivery_status(db: Session, delivery_id: int, status: DeliveryStatus, **kwargs) -> Optional[Delivery]:
    """Update delivery status and related information."""
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if delivery:
        delivery.status = status
        
        # Update timestamps based on status
        if status == DeliveryStatus.PICKED_UP:
            delivery.picked_up_at = datetime.utcnow()
        elif status == DeliveryStatus.DELIVERED:
            delivery.delivered_at = datetime.utcnow()
        
        # Update additional fields if provided
        for key, value in kwargs.items():
            if hasattr(delivery, key):
                setattr(delivery, key, value)
        
        db.commit()
        db.refresh(delivery)
    return delivery

def get_available_delivery_persons(db: Session) -> List[User]:
    """Get available delivery persons."""
    return db.query(User).filter(
        User.is_delivery_person == True,
        User.is_active == True
    ).all()

def calculate_delivery_fee(distance_km: float, base_fee: float = 50.0) -> float:
    """Calculate delivery fee based on distance."""
    if distance_km <= 5:
        return base_fee
    elif distance_km <= 10:
        return base_fee + (distance_km - 5) * 10
    else:
        return base_fee + 50 + (distance_km - 10) * 15

def update_delivery_location(db: Session, delivery_id: int, location: str) -> Optional[Delivery]:
    """Update delivery person's current location."""
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if delivery:
        delivery.current_location = location
        db.commit()
        db.refresh(delivery)
    return delivery

