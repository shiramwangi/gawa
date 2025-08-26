from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.post("/assign")
async def assign_delivery(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Assign a delivery to a rider/driver."""
    return {"message": "Delivery assigned", "delivery_id": 1}

@router.get("/{delivery_id}")
async def get_delivery(delivery_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get delivery details by ID."""
    return {"delivery": {"id": delivery_id, "status": "pending"}}


