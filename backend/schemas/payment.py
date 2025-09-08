from pydantic import BaseModel

class PaymentInit(BaseModel):
    user_id: int
    order_id: int
    amount: float

class PaymentStatus(BaseModel):
    status: str
    transaction_id: str
