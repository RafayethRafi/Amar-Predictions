from pydantic import BaseModel,EmailStr
from datetime import datetime
from typing import Optional
from pydantic.types import conint


class Token(BaseModel):
    access_token: str
    token_type : str


class TokenData(BaseModel):
    id : Optional[int] = None

class UserBase(BaseModel):
    email : EmailStr
    name : str
    

class UserCreate(UserBase):
    password: str
    phone: Optional[str] = None
    
class UserOut(UserBase):
    id : int
    phone: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    isAdmin: bool
    
    class Config:
        from_attributes = True
     
