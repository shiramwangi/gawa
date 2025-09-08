from fastapi import APIRouter, Depends, HTTPException, status
from schemas.user import UserCreate, UserLogin, UserOut, Token
from services.auth_service import AuthService
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()
auth_service = AuthService()

@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return auth_service.signup(db, user)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    try:
        return auth_service.login(db, data)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
