from schemas.user import UserCreate, UserLogin, UserOut, Token, TokenData
from sqlalchemy.orm import Session
from models.user import User
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import os
from utils.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    def signup(self, db: Session, user: UserCreate) -> UserOut:
        existing = db.query(User).filter(User.email == user.email).first()
        if existing:
            raise ValueError("Email already registered")
        hashed = get_password_hash(user.password)
        db_user = User(email=user.email, username=user.username, hashed_password=hashed)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return UserOut.from_orm(db_user)

    def login(self, db: Session, data: UserLogin) -> Token:
        user = authenticate_user(db, data.email, data.password)
        if not user:
            # Raise here or return generic token error upstream
            raise ValueError("Invalid credentials")
        access_token = create_access_token({"sub": user.email})
        return Token(access_token=access_token, token_type="bearer")


# Token utilities expected by utils.security
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

def verify_token(token: str, credentials_exception) -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub") or payload.get("email")
        if email is None:
            raise credentials_exception
        return TokenData(email=email)
    except JWTError:
        raise credentials_exception


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
