from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from models import Tweet
from database import SessionLocal, init_db
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()
init_db()

class TweetCreate(BaseModel):
    message: str
    author: str

class TweetRead(BaseModel):
    id: int
    message: str
    author: str
    timestamp: datetime

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/tweets", response_model=List[TweetRead])
def read_tweets(db: Session = Depends(get_db)):
    return db.query(Tweet).all()

@app.post("/tweets", response_model=TweetRead)
def create_tweet(tweet: TweetCreate, db: Session = Depends(get_db)):
    db_tweet = Tweet(**tweet.dict())
    db.add(db_tweet)
    db.commit()
    db.refresh(db_tweet)
    return db_tweet
