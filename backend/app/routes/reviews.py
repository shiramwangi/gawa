from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.post("/order/{order_id}")
async def review_order(order_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Create a review for an order."""
    return {"message": f"Review created for order {order_id}"}

@router.get("/meal/{meal_id}")
async def get_meal_reviews(meal_id: int):
    """Get reviews for a specific meal."""
    return {"reviews": [], "meal_id": meal_id}


