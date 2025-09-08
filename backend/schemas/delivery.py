from pydantic import BaseModel

class DeliveryRequest(BaseModel):
    order_id: int
    address: str

class DeliveryStatus(BaseModel):
    status: str
    tracking_id: str
