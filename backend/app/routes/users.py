from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

@router.get("/me")
async def get_me(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get the currently authenticated user's profile."""
    return {"user": {"id": 1, "name": "Demo User"}}

@router.get("/{user_id}")
async def get_user(user_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get a user's profile by ID."""
    return {"user": {"id": user_id}}

@router.put("/{user_id}")
async def update_user(user_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Update a user's profile fields such as name, phone, location."""
    return {"message": f"User {user_id} updated"}

@router.delete("/{user_id}")
async def delete_user(user_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Delete a user's account by ID."""
    return {"message": f"User {user_id} deleted"}
