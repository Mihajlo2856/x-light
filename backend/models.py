from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Tweet(Base):
    __tablename__ = "tweets"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    author = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
