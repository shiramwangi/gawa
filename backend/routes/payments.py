from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.payment import PaymentInit, PaymentStatus
from models.payment import Payment, PaymentStatus as PayStatus, PaymentMethod
from models.contribution import Contribution, ContributionStatus

router = APIRouter()

@router.post("/init", response_model=PaymentStatus)
def init_payment(data: PaymentInit, db: Session = Depends(get_db)):
    # Idempotent: check existing by reference on contribution
    contrib = db.query(Contribution).filter(Contribution.id == data.user_id).first()
    if not contrib:
        raise HTTPException(status_code=404, detail="Contribution not found")
    # For MVP, create payment or return existing
    payment = db.query(Payment).filter(Payment.order_id == contrib.order_id, Payment.amount == contrib.amount).first()
    if not payment:
        payment = Payment(
            order_id=contrib.order_id,
            amount=contrib.amount,
            currency="KES",
            payment_method=PaymentMethod.MPESA,
            status=PayStatus.PROCESSING,
        )
        db.add(payment)
        db.commit()
        db.refresh(payment)
    return PaymentStatus(status="processing", transaction_id=str(payment.id))

@router.get("/{transaction_id}", response_model=PaymentStatus)
def check_payment(transaction_id: str, db: Session = Depends(get_db)):
    payment = db.query(Payment).filter(Payment.id == int(transaction_id)).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return PaymentStatus(status=payment.status.value, transaction_id=transaction_id)


@router.post("/webhook/mpesa", response_model=PaymentStatus)
def webhook_mpesa(callback: dict, db: Session = Depends(get_db)):
    # MVP: mark first PROCESSING payment as COMPLETED and contribution as PAID
    payment = db.query(Payment).filter(Payment.status == PayStatus.PROCESSING).first()
    if not payment:
        raise HTTPException(status_code=404, detail="No processing payment")
    payment.status = PayStatus.COMPLETED
    contrib = db.query(Contribution).filter(Contribution.order_id == payment.order_id, Contribution.amount == payment.amount).first()
    if contrib:
        contrib.status = ContributionStatus.PAID
    db.commit()
    return PaymentStatus(status="completed", transaction_id=str(payment.id))
