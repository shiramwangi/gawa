from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.order import Order, OrderStatus
from models.user import User
from schemas.order import OrderCreate, OrderUpdate, Order as OrderSchema
from services.order_service import (
    create_order, get_order, get_orders_by_customer, 
    get_orders_by_restaurant, update_order_status
)
from utils.security import get_current_user

router = APIRouter()

@router.post("/", response_model=OrderSchema)
async def create_new_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new order."""
    try:
        return create_order(db=db, order=order, customer_id=current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[OrderSchema])
async def get_orders(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get orders for the current user."""
    if current_user.is_restaurant_owner:
        # If user is restaurant owner, get orders for their restaurants
        # This is simplified - in real app you'd get restaurant IDs first
        return get_orders_by_restaurant(db, restaurant_id=1, skip=skip, limit=limit)
    else:
        # Regular customer - get their orders
        return get_orders_by_customer(db, customer_id=current_user.id, skip=skip, limit=limit)

@router.get("/{order_id}", response_model=OrderSchema)
async def get_order_by_id(
    order_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific order by ID."""
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Check if user has permission to view this order
    if order.customer_id != current_user.id and order.restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return order

@router.put("/{order_id}", response_model=OrderSchema)
async def update_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update order status."""
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Check if user has permission to update this order
    if order.restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update order status
    if order_update.status:
        updated_order = update_order_status(db, order_id, order_update.status)
        if not updated_order:
            raise HTTPException(status_code=400, detail="Failed to update order")
        return updated_order
    
    return order

@router.delete("/{order_id}")
async def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel an order."""
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Only customer can cancel their order
    if order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Only allow cancellation if order is still pending
    if order.status != OrderStatus.PENDING:
        raise HTTPException(status_code=400, detail="Order cannot be cancelled")
    
    update_order_status(db, order_id, OrderStatus.CANCELLED)
    return {"message": "Order cancelled successfully"}
