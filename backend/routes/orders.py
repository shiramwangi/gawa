from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.order import Order, OrderStatus
from models.contribution import Contribution, ContributionStatus
from models.meal import Meal
from models.delivery import Delivery, DeliveryStatus
from models.payment import Payment, PaymentStatus, PaymentMethod
from schemas.order import OrderCreate, OrderOut, ContributionCreate, ContributionOut
from utils.security import get_current_user
from sqlalchemy.exc import SQLAlchemyError

router = APIRouter()


@router.post("/", response_model=OrderOut)
def create_order(order_in: OrderCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    meal = db.query(Meal).filter(Meal.id == order_in.meal_id).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")

    db_order = Order(
        order_number=f"ORD-POOL-{meal.id}-{current_user.id}",
        customer_id=current_user.id,
        restaurant_id=meal.restaurant_id,
        status=OrderStatus.PENDING,
        target_amount=order_in.target_amount,
        current_amount=0.0,
        delivery_address="",
        delivery_phone=None,
        delivery_instructions=None,
        total_amount=0.0,
        tax=0.0,
        delivery_fee=0.0,
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@router.get("/", response_model=List[OrderOut])
def list_orders(status_filter: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Order)
    if status_filter:
        try:
            query = query.filter(Order.status == OrderStatus(status_filter))
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid status filter")
    return query.order_by(Order.created_at.desc()).all()


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/{order_id}/contributions", response_model=ContributionOut)
def add_contribution(order_id: int, contrib_in: ContributionCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        order = db.query(Order).with_for_update().filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        remaining = max(order.target_amount - order.current_amount, 0.0)
        if contrib_in.amount <= 0:
            raise HTTPException(status_code=400, detail="Amount must be positive")
        if contrib_in.amount > remaining:
            raise HTTPException(status_code=400, detail="Amount exceeds remaining target")

        db_contrib = Contribution(
            order_id=order.id,
            user_id=current_user.id,
            amount=contrib_in.amount,
            status=ContributionStatus.PAID,  # mock immediate success
            payment_reference=f"PM-{order.id}-{current_user.id}"
        )
        db.add(db_contrib)
        order.current_amount += contrib_in.amount

        # Auto-confirm when fully funded
        if order.current_amount >= order.target_amount:
            order.status = OrderStatus.CONFIRMED
            # Mock restaurant placement: set total_amount to target
            order.total_amount = order.target_amount
            # Create delivery (mock fee and addresses for now)
            delivery = Delivery(
                order_id=order.id,
                delivery_fee=0.0,
                status=DeliveryStatus.PENDING,
                pickup_address=f"Restaurant #{order.restaurant_id}",
                delivery_address=order.delivery_address or "To be provided",
                delivery_notes=None
            )
            db.add(delivery)

        db.commit()
        db.refresh(db_contrib)
        db.refresh(order)
        return db_contrib
    except SQLAlchemyError:
        db.rollback()
        raise
