from sqlalchemy import Column, Integer, String, ForeignKey, LargeBinary, Boolean, JSON
from sqlalchemy.orm import relationship

from database import Base
class UserDb(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key= True, index= True)
    name = Column(String)
    password = Column(String)
    sessiontoken = Column(String)
    admin = Column(Boolean)
class CardDb(Base):
    __tablename__ = "photos"
    id = Column(Integer, primary_key= True, index= True)
    title = Column(String)
    body = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    data = Column(LargeBinary)
    user = relationship("UserDb")
    views = Column(Integer)
    size = Column(JSON)
    price = Column(Integer)
    category = Column(String)
    rating  = Column(Integer)
    reviews = Column(Integer)
    Oldprice = Column(Integer)
