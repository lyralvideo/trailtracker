from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class User(BaseModel):
    username: str
    password: str
    
class Settings(BaseModel):
    authjwt_secret_key: str = "my_jwt_secret"
    
@AuthJWT.load_config
def get_config():
    return Settings()
    
@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
    
@app.get("/")
def read_root():
    return {"Hello": "World Rasyue"}
    
@app.post('/login')
def login(user: User, Authorize: AuthJWT = Depends()):
    #user.username
    #user.password
    # this is the part where we will check the user credentials with our database record
    #but since we are not going to use any db, straight away we will just create the token and send it back
    # subject identifier for who this token is for example id or username from database
    access_token = Authorize.create_access_token(subject=user.username)
    return {"access_token": access_token}
    
@app.get('/test-jwt')
def user(Authorize: AuthJWT = Depends()):
    
    Authorize.jwt_required()
    return {"user": 123124124, 'data': 'jwt test works'} 
    #current_user = Authorize.get_jwt_subject()
    #return {"user": current_user, 'data': 'jwt test works'}