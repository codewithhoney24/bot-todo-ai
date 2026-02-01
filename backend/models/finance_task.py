from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import Optional
from . import CategoryEnum, Base


class FinanceTask(Base):
    __tablename__ = "finance_task"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(SQLEnum(CategoryEnum), nullable=False)
    amount = Column(Float, nullable=True)
    due_date = Column(DateTime, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class FinanceTaskCreate:
    def __init__(self, user_id: str, title: str, description: Optional[str] = None,
                 category: CategoryEnum = None, amount: Optional[float] = None,
                 due_date: Optional[datetime] = None):
        self.user_id = user_id
        self.title = title
        self.description = description
        self.category = category
        self.amount = amount
        self.due_date = due_date


class FinanceTaskRead:
    def __init__(self, id: int, user_id: str, title: str, description: Optional[str],
                 category: CategoryEnum, amount: Optional[float], due_date: Optional[datetime],
                 completed: bool, created_at: datetime, updated_at: datetime):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.description = description
        self.category = category
        self.amount = amount
        self.due_date = due_date
        self.completed = completed
        self.created_at = created_at
        self.updated_at = updated_at