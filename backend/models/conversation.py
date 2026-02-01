from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import Optional
from . import Base


class Conversation(Base):
    __tablename__ = "conversation"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ConversationCreate:
    def __init__(self, user_id: str):
        self.user_id = user_id


class ConversationRead:
    def __init__(self, id: int, user_id: str, created_at: datetime, updated_at: datetime):
        self.id = id
        self.user_id = user_id
        self.created_at = created_at
        self.updated_at = updated_at