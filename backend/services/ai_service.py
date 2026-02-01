import os
import json
from typing import List, Dict, Any
from openai import OpenAI
from pydantic import BaseModel
from models.conversation import Conversation
from services.conversation_service import ConversationService
from services.task_service import TaskService


class AIResponse(BaseModel):
    response_text: str
    tool_calls: List[Dict[str, Any]] = []


async def process_chat_message(
    user_id: str,
    conversation_id: int,
    message: str,
    conversation_service: ConversationService,
    task_service: TaskService
) -> AIResponse:
    """
    Process a chat message using OpenAI and MCP tools.
    """
    # Check if OpenAI API key is available
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        # Return a mock response if no API key is available
        return AIResponse(
            response_text="Finance Buddy is running in demo mode. In a real implementation, this would connect to OpenAI to process your request.",
            tool_calls=[]
        )

    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)

    # Retrieve conversation history
    messages = conversation_service.get_messages(conversation_id, user_id)

    # Format messages for OpenAI
    openai_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in messages
    ]

    # Add the new user message
    openai_messages.append({"role": "user", "content": message})

    # Define available tools based on MCP tools
    tools = [
        {
            "type": "function",
            "function": {
                "name": "add_finance_task",
                "description": "Add a new finance task",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string"},
                        "title": {"type": "string"},
                        "description": {"type": "string"},
                        "category": {"type": "string", "enum": ["bill", "budget", "savings", "investment", "subscription", "tax", "expense", "other"]},
                        "amount": {"type": "number"},
                        "due_date": {"type": "string"}
                    },
                    "required": ["user_id", "title", "category"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "list_finance_tasks",
                "description": "List finance tasks with optional filtering",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string"},
                        "status": {"type": "string", "enum": ["all", "pending", "completed"]},
                        "category": {"type": "string", "enum": ["bill", "budget", "savings", "investment", "subscription", "tax", "expense", "other"]}
                    },
                    "required": ["user_id"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "complete_finance_task",
                "description": "Mark a finance task as completed",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string"},
                        "task_id": {"type": "integer"}
                    },
                    "required": ["user_id", "task_id"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "delete_finance_task",
                "description": "Delete a finance task",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string"},
                        "task_id": {"type": "integer"}
                    },
                    "required": ["user_id", "task_id"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "update_finance_task",
                "description": "Update a finance task",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "user_id": {"type": "string"},
                        "task_id": {"type": "integer"},
                        "title": {"type": "string"},
                        "description": {"type": "string"},
                        "category": {"type": "string", "enum": ["bill", "budget", "savings", "investment", "subscription", "tax", "expense", "other"]},
                        "amount": {"type": "number"},
                        "due_date": {"type": "string"}
                    },
                    "required": ["user_id", "task_id"]
                }
            }
        }
    ]

    try:
        # Call OpenAI API with tools
        response = client.chat.completions.create(
            model="gpt-4",
            messages=openai_messages,
            tools=tools,
            tool_choice="auto"
        )

        # Process the response
        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

        # Execute tool calls if any
        if tool_calls:
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)

                # Execute the appropriate function based on the tool called
                if function_name == "add_finance_task":
                    # Call the task service to add the task
                    from models.finance_task import FinanceTaskCreate, CategoryEnum
                    task_create = FinanceTaskCreate(
                        user_id=function_args["user_id"],
                        title=function_args.get("title"),
                        description=function_args.get("description"),
                        category=CategoryEnum(function_args.get("category")),
                        amount=function_args.get("amount"),
                        due_date=function_args.get("due_date")
                    )
                    task_service.create_task(task_create)

                elif function_name == "list_finance_tasks":
                    # Call the task service to list tasks
                    status = function_args.get("status", "all")
                    category = function_args.get("category")
                    tasks = task_service.list_tasks(
                        user_id=function_args["user_id"],
                        status=status,
                        category=category
                    )

                elif function_name == "complete_finance_task":
                    # Call the task service to complete a task
                    task_service.complete_task(
                        user_id=function_args["user_id"],
                        task_id=function_args["task_id"]
                    )

                elif function_name == "delete_finance_task":
                    # Call the task service to delete a task
                    task_service.delete_task(
                        user_id=function_args["user_id"],
                        task_id=function_args["task_id"]
                    )

                elif function_name == "update_finance_task":
                    # Call the task service to update a task
                    task_service.update_task(
                        user_id=function_args["user_id"],
                        task_id=function_args["task_id"],
                        task_update={k: v for k, v in function_args.items() if k not in ["user_id", "task_id"]}
                    )

        # Return the AI response
        return AIResponse(
            response_text=response_message.content or "",
            tool_calls=[{
                "name": tc.function.name,
                "arguments": json.loads(tc.function.arguments)
            } for tc in tool_calls] if tool_calls else []
        )
    except Exception as e:
        # Handle case where AI cannot parse user's request
        return AIResponse(
            response_text="I'm sorry, I couldn't understand your request. Could you please rephrase?",
            tool_calls=[]
        )