from sqlalchemy.orm import Session
from models.user import User
from schemas.user import SignupRequest, LoginRequest, ForgotPasswordRequest
from utils.auth import get_password_hash, verify_password

def create_user(db: Session, user: SignupRequest):
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, phone=user.phone, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def update_user_password(db: Session, username: str, new_password: str):
    user = get_user_by_username(db, username)
    if user:
        user.password = get_password_hash(new_password)
        db.commit()
        db.refresh(user)
    return user