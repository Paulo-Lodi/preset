from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from passlib.context import CryptContext
import jwt
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "mysecret")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credencias Inválidas")
    
    token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm="HS256")
    return {"token": token}