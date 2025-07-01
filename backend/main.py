from fastapi import FastAPI, Depends
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
from typing import List

app = FastAPI()
Base = declarative_base()
engine = create_engine("sqlite:///./tweets.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

class Tweet(Base):
    __tablename__ = "tweets"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    author = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

class TweetCreate(BaseModel):
    message: str
    author: str

class TweetRead(TweetCreate):
    id: int
    timestamp: datetime
    class Config: orm_mode = True

@app.get("/tweets", response_model=List[TweetRead])
def get_tweets(db: Session = Depends(get_db)):
    return db.query(Tweet).all()

@app.post("/tweets", response_model=TweetRead)
def create_tweet(tweet: TweetCreate, db: Session = Depends(get_db)):
    t = Tweet(**tweet.dict())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t
