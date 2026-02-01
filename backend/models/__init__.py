from enum import Enum
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func


Base = declarative_base()


class CategoryEnum(Enum):
    bill = "bill"
    budget = "budget"
    savings = "savings"
    investment = "investment"
    subscription = "subscription"
    tax = "tax"
    expense = "expense"
    other = "other"