from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from core.auth import create_access_token
from typing import Optional


router = APIRouter()

# HTTPBearer for token authentication
token_auth_scheme = HTTPBearer()


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


@router.post("/login", response_model=LoginResponse)
async def login(login_request: LoginRequest):
    # This is a simplified authentication - in a real app, you would verify credentials against a database
    # For demo purposes, we'll accept any non-empty username/password combination
    if not login_request.username or not login_request.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create a token for the user
    user_id = login_request.username  # In a real app, this would come from your user database
    access_token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/protected")
async def protected_route(current_user: str = Depends(lambda: "demo_user")):
    """
    A protected route that requires authentication.
    This is just for testing - in a real app, you'd use the actual get_current_user function.
    """
    return {"message": f"Hello {current_user}, you have access to this protected route!"}