from typing import List, Optional
from sqlalchemy.orm import Session
from models.order import Order, OrderItem, OrderStatus
from models.meal import Meal
from schemas.order import OrderCreate, OrderUpdate
from datetime import datetime
import uuid

def create_order(db: Session, order: OrderCreate, customer_id: int) -> Order:
    """Create a new order."""
    # Generate unique order number
    order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
    
    # Calculate subtotal
    subtotal = 0.0
    order_items_data = []
    
    for item in order.order_items:
        meal = db.query(Meal).filter(Meal.id == item.meal_id).first()
        if not meal:
            raise ValueError(f"Meal with id {item.meal_id} not found")
        
        unit_price = meal.price
        total_price = unit_price * item.quantity
        subtotal += total_price
        
        order_items_data.append({
            "meal_id": item.meal_id,
            "quantity": item.quantity,
            "unit_price": unit_price,
            "total_price": total_price,
            "special_instructions": item.special_instructions
        })
    
    # Create order
    db_order = Order(
        order_number=order_number,
        customer_id=customer_id,
        restaurant_id=order.restaurant_id,
        status=OrderStatus.PENDING,
        subtotal=subtotal,
        delivery_fee=0.0,  # Will be calculated based on restaurant
        tax=0.0,  # Will be calculated
        total_amount=subtotal,  # Will be updated after adding fees
        delivery_address=order.delivery_address,
        delivery_phone=order.delivery_phone,
        delivery_instructions=order.delivery_instructions
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Create order items
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=db_order.id,
            **item_data
        )
        db.add(order_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

def get_order(db: Session, order_id: int) -> Optional[Order]:
    """Get an order by ID."""
    return db.query(Order).filter(Order.id == order_id).first()

def get_orders_by_customer(db: Session, customer_id: int, skip: int = 0, limit: int = 100) -> List[Order]:
    """Get orders for a specific customer."""
    return db.query(Order).filter(Order.customer_id == customer_id).offset(skip).limit(limit).all()

def get_orders_by_restaurant(db: Session, restaurant_id: int, skip: int = 0, limit: int = 100) -> List[Order]:
    """Get orders for a specific restaurant."""
    return db.query(Order).filter(Order.restaurant_id == restaurant_id).offset(skip).limit(limit).all()

def update_order_status(db: Session, order_id: int, status: OrderStatus) -> Optional[Order]:
    """Update order status."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if order:
        order.status = status
        if status == OrderStatus.DELIVERED:
            order.delivered_at = datetime.utcnow()
        db.commit()
        db.refresh(order)
    return order

def assign_delivery_person(db: Session, order_id: int, delivery_person_id: int) -> Optional[Order]:
    """Assign a delivery person to an order."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if order:
        order.delivery_person_id = delivery_person_id
        order.status = OrderStatus.OUT_FOR_DELIVERY
        db.commit()
        db.refresh(order)
    return order
