from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.get("/")
async def list_orders():
    return {"orders": []}

@router.post("/")
async def create_order(credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": "Order created"}

@router.get("/{order_id}")
async def get_order(order_id: int):
    return {"order": {"id": order_id}}

@router.post("/{order_id}/join")
async def join_order(order_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": f"Joined order {order_id}"}

@router.post("/{order_id}/leave")
async def leave_order(order_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": f"Left order {order_id}"}

@router.put("/{order_id}/complete")
async def complete_order(order_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": f"Order {order_id} marked complete"}
