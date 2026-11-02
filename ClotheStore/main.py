import base64
import json
from urllib.parse import quote

from fastapi import FastAPI, UploadFile, File,Response, HTTPException
from fastapi import Depends, Form
from sqlalchemy import JSON
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
import secrets
from Schema import Photo, CreateUser, User, TokenRequest, CardResponse
from database import Base, engine, session_local

from models import CardDb as PhotoDb, UserDb

app = FastAPI()
Base.metadata.create_all(bind = engine)
app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173",],  # Укажите только разрешённые домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=[
        "x-title",
        "x-body",
        "x-price",
        "x-oldprice",
        "x-rating",
        "x-reviews",
        "x-sizes",
        "x-category",
        ],)


def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("/Img/Add")
async def create_card(title: str = Form(...),body: str = Form(...), author_id: int = Form(...), photo: UploadFile = File(...), price: int = Form(...), Oldprice: int = Form(None), category: str = Form(...), sizes: str = Form(...), db: Session = Depends(get_db)):
    if photo is None or author_id == 0:
        raise HTTPException(status_code = 404)
    photo_bytes = await photo.read()
    db_photo = PhotoDb(data= photo_bytes, author_id= author_id, title= title, body = body, views = 0, price = price, Oldprice = Oldprice, category = category, size = sizes)
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return Response(content=photo_bytes, media_type="image/jpeg", headers={"X-title": db_photo.title, "X-body": db_photo.body})

@app.post("/userAdd", response_model=User)
def create_user( user: CreateUser, db: Session = Depends(get_db)):
    db_all_users = db.query(UserDb).filter(UserDb.name == user.name).first()
    if db_all_users is None:
        db_user = UserDb(name=user.name, password= user.password)
        if not user.name  or not user.password :
            raise HTTPException(status_code=409, detail= "Имя пользователя или пароль содержит недопустимое значение")
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    else:
        raise HTTPException(status_code=409, detail= "Пользователь с таким именем уже существует")
@app.get("/Img/get")
def get_Img(id:int, db: Session = Depends(get_db)):
    db_Img = db.query(PhotoDb).filter(PhotoDb.id == id).first()
    if db_Img is None:
        raise HTTPException(status_code = 404, detail="Image is not found")
    data = db_Img.data
    return Response(content=data, media_type="image/jpeg",headers={"X-title": db_Img.title, "X-body": db_Img.body})

@app.post("/users/find")
def user_autorisation(user:CreateUser,db: Session = Depends(get_db)):
    db_user = db.query(UserDb).filter(UserDb.name == user.name, UserDb.password == user.password).first()
    token = secrets.token_hex(32)
    if db_user is None:
        raise HTTPException(status_code = 404, detail="user is not found")
    db_user.sessiontoken = token
    db.commit()
    db.refresh(db_user)
    return db_user
@app.get("/usersAll")
def get_all_users(db: Session = Depends(get_db)):
    all_users = db.query(UserDb).all()
    return all_users
@app.post("/userToken")
def find_user_by_token(token:TokenRequest,db: Session = Depends(get_db)):
    db_user = db.query(UserDb).filter(UserDb.sessiontoken == token.token).first()
    return db_user
@app.get("/post/allposts")
def all_posts(db: Session = Depends(get_db)):
    result = []
    db_all_posts = db.query(PhotoDb).all()
    for post in db_all_posts:
        if post.price == post.Oldprice:
            result.append(CardResponse(
            id=post.id,
            title=post.title,
            body=post.body,
            author_id=post.author_id,
            views=post.views,
            price = post.price

            ))
        else:
            result.append(CardResponse(
                id=post.id,
                title=post.title,
                body=post.body,
                author_id=post.author_id,
                views=post.views,
                price=post.price,
                oldprice = post.Oldprice
            ))
    return result
@app.post("/admin/add")
def get_admin(id:int, db: Session = Depends(get_db)):
    db_user = db.query(UserDb).filter(UserDb.id == id).first()
    db_user.admin = True
    db.commit()
    db.refresh(db_user)
    return {"User be admin", db_user}
@app.delete("/del/post")
def delete_post(id:int = Form(...), db: Session = Depends(get_db)):
    db_post = db.query(PhotoDb).filter(PhotoDb.id == id).first()
    if not db_post or id ==0:
        raise HTTPException(status_code=404, detail="Ничего нет")
    return_post = db_post
    db.delete(db_post)
    db.commit()
    return Response(content=return_post.data, media_type="image/jpeg")
@app.get("/Img/{postId}")
def find_photo(postId: int, db: Session = Depends(get_db)):
    db_photo = db.query(PhotoDb).filter(PhotoDb.id == postId).first()
    if not db_photo or postId ==0:
        raise HTTPException(status_code=404, detail="Ничего нет")
    return Response(content=db_photo.data, media_type="image/jpeg")
@app.get("/Posts/{postId}")
def post_find(postId: int, db: Session = Depends(get_db)):
    db_photo = db.query(PhotoDb).filter(PhotoDb.id == postId).first()
    if not db_photo or postId ==0:
        raise HTTPException(status_code=404, detail="Ничего нет")
    return Response(content=db_photo.data, media_type="image/jpeg", headers= {"x-title": db_photo.title, "x-body": db_photo.body, "x-author-id": str(db_photo.author_id),
        "x-price": str(db_photo.price),
        "x-oldprice": str(db_photo.Oldprice),
        "x-category": quote(db_photo.category),
        "x-rating": str(db_photo.rating),
        "x-sizes": json.dumps(db_photo.size),})
@app.patch("/posts/{postid}")
def addview(postid: int,db: Session = Depends(get_db)):
    db_post = db.query(PhotoDb).filter(PhotoDb.id == postid).first()

    db_post.views +=1
    db.commit()
    db.refresh(db_post)

    return {"message": "View added successfully", "post.id ": db_post.id,"post.views":db_post.views}