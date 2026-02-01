from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.conversation import Conversation, ConversationCreate
from models.message import Message, MessageCreate
from core.database import get_db


class ConversationService:
    def __init__(self, session: Session):
        self.session = session

    def create_conversation(self, user_id: str) -> Conversation:
        """Create a new conversation"""
        try:
            conversation = Conversation(user_id=user_id)
            self.session.add(conversation)
            self.session.commit()
            self.session.refresh(conversation)
            return conversation
        except Exception as e:
            self.session.rollback()
            raise e

    def get_conversation(self, conversation_id: int, user_id: str) -> Conversation:
        """Get a specific conversation for a user"""
        try:
            conversation = self.session.query(Conversation).filter(
                and_(Conversation.id == conversation_id, Conversation.user_id == user_id)
            ).first()
            return conversation
        except Exception as e:
            raise e

    def add_message(self, message_create: MessageCreate) -> Message:
        """Add a message to a conversation"""
        try:
            message = Message(
                user_id=message_create.user_id,
                conversation_id=message_create.conversation_id,
                role=message_create.role,
                content=message_create.content
            )
            self.session.add(message)
            self.session.commit()
            self.session.refresh(message)
            return message
        except Exception as e:
            self.session.rollback()
            raise e

    def get_messages(self, conversation_id: int, user_id: str) -> List[Message]:
        """Get all messages for a conversation"""
        try:
            messages = self.session.query(Message).filter(
                and_(Message.conversation_id == conversation_id, Message.user_id == user_id)
            ).order_by(Message.created_at).all()
            return messages
        except Exception as e:
            raise e