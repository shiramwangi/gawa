from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.get("/")
async def get_users():
    """Get all users"""
    return {"message": "Get all users endpoint"}

@router.get("/{user_id}")
async def get_user(user_id: int):
    """Get user by ID"""
    return {"message": f"Get user {user_id} endpoint"}

@router.put("/{user_id}")
async def update_user(user_id: int):
    """Update user by ID"""
    return {"message": f"Update user {user_id} endpoint"}

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    """Delete user by ID"""
    return {"message": f"Delete user {user_id} endpoint"}
