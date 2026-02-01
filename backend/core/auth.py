from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from core.config import settings
import bcrypt


# Secret key for JWT - in production, use a strong random key
SECRET_KEY = settings.auth_secret or "fallback-secret-key-for-development"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class TokenData(BaseModel):
    user_id: str


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Optional[TokenData]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        token_data = TokenData(user_id=user_id)
        return token_data
    except jwt.InvalidTokenError:
        return None


def get_current_user_from_token(token: str):
    """
    Extract and validate user from authentication token.
    """
    token_data = verify_token(token)

    if token_data is None:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
        )

    return token_data.user_id