from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import Optional
from . import Base


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    conversation_id = Column(Integer, ForeignKey("conversation.id"))
    role = Column(String, nullable=False)  # "user" or "assistant"
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class MessageCreate:
    def __init__(self, user_id: str, conversation_id: int, role: str, content: str):
        self.user_id = user_id
        self.conversation_id = conversation_id
        self.role = role  # "user" or "assistant"
        self.content = content


class MessageRead:
    def __init__(self, id: int, user_id: str, conversation_id: int, role: str,
                 content: str, created_at: datetime):
        self.id = id
        self.user_id = user_id
        self.conversation_id = conversation_id
        self.role = role
        self.content = content
        self.created_at = created_at