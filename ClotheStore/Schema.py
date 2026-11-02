from pydantic import BaseModel, ConfigDict


class PhotoBase(BaseModel):
    data: bytes

class Photo(PhotoBase):
    author_id:int
    model_config = ConfigDict(from_attributes=True)
    id: int

class UserBase(BaseModel):
    name:str
class User(UserBase):
    id: int
class CreateUser(UserBase):
    password:str

class TokenRequest(BaseModel):
    token: str
class CardResponse(BaseModel):
    id: int
    title: str
    body: str
    author_id: int
    views: int = 0


    model_config = ConfigDict(from_attributes=True)