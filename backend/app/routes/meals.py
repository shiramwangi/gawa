from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.get("/")
async def list_meals():
    return {"meals": []}

@router.post("/")
async def create_meal(credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": "Meal created"}

@router.get("/{meal_id}")
async def get_meal(meal_id: int):
    return {"meal": {"id": meal_id}}

@router.put("/{meal_id}")
async def update_meal(meal_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": f"Meal {meal_id} updated"}

@router.delete("/{meal_id}")
async def delete_meal(meal_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    return {"message": f"Meal {meal_id} deleted"}
