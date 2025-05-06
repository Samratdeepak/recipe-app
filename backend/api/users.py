from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import SignupRequest, LoginRequest, ForgotPasswordRequest
from crud.user import create_user, get_user_by_username, update_user_password
from dependencies.database import get_db
from utils.auth import create_access_token, verify_password
from models.user import User
from dependencies.database import get_db

router = APIRouter()

@router.post("/signup/")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    if request.password != request.re_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    existing_user = get_user_by_username(db, request.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = create_user(db, request)
    return {"message": "Signup successful", "username": user.username}

@router.post("/login/")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_username(db, request.username)
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token({"sub": user.username, "user_id": user.user_id})
    return {"message": "Login successful", "token": token, "username": user.username, "user_id": user.user_id}

@router.post("/forgot-password/")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    if request.new_password != request.re_new_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    user = get_user_by_username(db, request.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_user_password(db, request.username, request.new_password)
    return {"message": "Password reset successful"}

@router.get("/users/")
def list_users(db: Session = Depends(get_db)):
    users = db.query(User).filter(User.user_id != 1).all()
    user_list = [{"username": user.username, "email": user.email, "phone": user.phone} for user in users]
    return {"users": user_list}