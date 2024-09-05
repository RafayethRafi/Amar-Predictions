from .. import models, schemas , utils,oauth2
from fastapi import Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from typing import List

router = APIRouter(
    prefix= "/admin",
    tags=['Admin']
)



@router.post("/hero_image_update",status_code=status.HTTP_201_CREATED,response_model=schemas.UserOut)
def hero_image_update(user:schemas.UserCreate, db: Session = Depends(get_db)):

    #hash the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user




#create an endpoint to see current_user details from the token received in the header
@router.get("/me", response_model=str)
def read_users_me(current_user: schemas.UserOut = Depends(oauth2.get_current_user)):
    return current_user