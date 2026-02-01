from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from models.conversation import Conversation
from models.message import MessageCreate
from services.conversation_service import ConversationService
from services.task_service import TaskService
from core.database import get_db
from core.security import get_current_user
import services.ai_service as ai_service


router = APIRouter()


@router.post("/chat", response_model=dict)
async def chat_endpoint(
    user_id: str,
    message: str,
    conversation_id: Optional[int] = None,
    current_user: str = Depends(get_current_user),
    session: Session = Depends(get_db)
):
    """
    Main endpoint for interacting with the Finance AI assistant.
    Handles conversation creation, message storage, and AI processing.
    """
    # Verify that the authenticated user matches the requested user_id
    if current_user != user_id:
        raise HTTPException(status_code=403, detail="Access denied: Cannot access another user's resources")

    conversation_service = ConversationService(session)
    task_service = TaskService(session)

    # Create or retrieve conversation
    if conversation_id:
        conversation = conversation_service.get_conversation(conversation_id, user_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = conversation_service.create_conversation(user_id)

    # Store user message
    user_message = MessageCreate(
        user_id=user_id,
        conversation_id=conversation.id,
        role="user",
        content=message
    )
    conversation_service.add_message(user_message)

    # Process with AI service
    try:
        ai_response = await ai_service.process_chat_message(
            user_id=user_id,
            conversation_id=conversation.id,
            message=message,
            conversation_service=conversation_service,
            task_service=task_service
        )

        # Store AI response
        ai_message = MessageCreate(
            user_id=user_id,
            conversation_id=conversation.id,
            role="assistant",
            content=ai_response.response_text
        )
        conversation_service.add_message(ai_message)

        return {
            "conversation_id": conversation.id,
            "response": ai_response.response_text,
            "tool_calls": ai_response.tool_calls
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing message: {str(e)}")