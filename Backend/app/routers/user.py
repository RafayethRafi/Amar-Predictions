from .. import models, schemas , utils,oauth2
from fastapi import Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from typing import List

router = APIRouter(
    prefix= "/users",
    tags=['Users']
)

#forgot password and recovery
# @router.post("/forgot_password/", status_code=status.HTTP_200_OK)
# def forgot_password(data:schemas.ForgotPassword,db: Session = Depends(get_db)) -> Response:

#     user = db.query(models.User).filter(models.User.email == data.email).first()

#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"{data.email} not registered")

#     send_email.send_pass_recovery_email(user.user_id,data.email)

#     return f"Recovery email sent to {data.email}"


@router.post("/register",status_code=status.HTTP_201_CREATED,response_model=schemas.UserOut)
def create_user(user:schemas.UserCreate, db: Session = Depends(get_db)):

    #hash the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user




#create an endpoint to see current_user details from the token received in the header
@router.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: schemas.UserOut = Depends(oauth2.get_current_user)):
    return current_user