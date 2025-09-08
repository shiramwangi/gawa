from fastapi import APIRouter
from schemas.delivery import DeliveryRequest, DeliveryStatus

router = APIRouter()

@router.post("/schedule", response_model=DeliveryStatus)
def schedule_delivery(data: DeliveryRequest):
    return DeliveryStatus(status="scheduled", tracking_id="track_123")

@router.get("/track/{tracking_id}", response_model=DeliveryStatus)
def track_delivery(tracking_id: str):
    return DeliveryStatus(status="in_transit", tracking_id=tracking_id)
