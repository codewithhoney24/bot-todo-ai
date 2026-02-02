from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat import router as chat_router
from api.auth import router as auth_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Finance Todo AI Chatbot", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-red-eight-52.vercel.app",
        "https://vercel.com/nousheen-atif",
        "http://localhost:3000",  # Local development
        "http://localhost:3001",  # Alternative local dev port
        "http://localhost:8000",  # Local backend for testing
        "http://127.0.0.1:3000",  # Alternative local dev
        "http://127.0.0.1:3001",  # Alternative local dev
        "https://vercel.app",     # General Vercel domain
        "*"  # Allow all origins for local development (be cautious in production)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(chat_router, prefix="/api/{user_id}", tags=["chat"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Finance Todo AI Chatbot API"}

# Include the database models to ensure they're registered
from models.finance_task import FinanceTask
from models.conversation import Conversation
from models.message import Message