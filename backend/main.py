from fastapi import FastAPI
from api.chat import router as chat_router
from api.auth import router as auth_router

app = FastAPI(title="Finance Todo AI Chatbot", version="1.0.0")

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