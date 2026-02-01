from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create the database engine
if settings.database_url:
    engine = create_engine(settings.database_url, echo=True)
else:
    # Use a default SQLite database for development if no database URL is provided
    database_path = os.path.join(os.path.dirname(__file__), "..", "finance_todo_dev.db")
    engine = create_engine(f"sqlite:///{database_path}", echo=True)

# Create a SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class for declarative models
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()