from mcp import Tool
from pydantic import BaseModel
from typing import Optional, List
import json


class AddFinanceTaskRequest(BaseModel):
    user_id: str
    title: str
    description: Optional[str] = None
    category: str
    amount: Optional[float] = None
    due_date: Optional[str] = None


class ListFinanceTasksRequest(BaseModel):
    user_id: str
    status: Optional[str] = "all"  # all, pending, completed
    category: Optional[str] = None


class CompleteFinanceTaskRequest(BaseModel):
    user_id: str
    task_id: int


class DeleteFinanceTaskRequest(BaseModel):
    user_id: str
    task_id: int


class UpdateFinanceTaskRequest(BaseModel):
    user_id: str
    task_id: int
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    amount: Optional[float] = None
    due_date: Optional[str] = None


def create_mcp_tools():
    """Create all finance-related MCP tools"""
    tools = []
    
    # Add finance task tool
    add_task_tool = Tool(
        name="add_finance_task",
        description="Add a new finance task",
        input_schema=AddFinanceTaskRequest.schema(),
        handler=add_finance_task_handler
    )
    tools.append(add_task_tool)
    
    # List finance tasks tool
    list_tasks_tool = Tool(
        name="list_finance_tasks",
        description="List finance tasks with optional filtering",
        input_schema=ListFinanceTasksRequest.schema(),
        handler=list_finance_tasks_handler
    )
    tools.append(list_tasks_tool)
    
    # Complete finance task tool
    complete_task_tool = Tool(
        name="complete_finance_task",
        description="Mark a finance task as completed",
        input_schema=CompleteFinanceTaskRequest.schema(),
        handler=complete_finance_task_handler
    )
    tools.append(complete_task_tool)
    
    # Delete finance task tool
    delete_task_tool = Tool(
        name="delete_finance_task",
        description="Delete a finance task",
        input_schema=DeleteFinanceTaskRequest.schema(),
        handler=delete_finance_task_handler
    )
    tools.append(delete_task_tool)
    
    # Update finance task tool
    update_task_tool = Tool(
        name="update_finance_task",
        description="Update a finance task",
        input_schema=UpdateFinanceTaskRequest.schema(),
        handler=update_finance_task_handler
    )
    tools.append(update_task_tool)
    
    return tools


def add_finance_task_handler(request: AddFinanceTaskRequest) -> dict:
    """Handler for adding a finance task"""
    # This would connect to the backend to add the task
    # For now, returning a mock response
    return {
        "task_id": 1,
        "status": "created",
        "title": request.title,
        "category": request.category
    }


def list_finance_tasks_handler(request: ListFinanceTasksRequest) -> List[dict]:
    """Handler for listing finance tasks"""
    # This would connect to the backend to fetch tasks
    # For now, returning a mock response
    return []


def complete_finance_task_handler(request: CompleteFinanceTaskRequest) -> dict:
    """Handler for completing a finance task"""
    # This would connect to the backend to update the task
    # For now, returning a mock response
    return {
        "task_id": request.task_id,
        "status": "completed",
        "title": "Sample Task"
    }


def delete_finance_task_handler(request: DeleteFinanceTaskRequest) -> dict:
    """Handler for deleting a finance task"""
    # This would connect to the backend to delete the task
    # For now, returning a mock response
    return {
        "task_id": request.task_id,
        "status": "deleted",
        "title": "Sample Task"
    }


def update_finance_task_handler(request: UpdateFinanceTaskRequest) -> dict:
    """Handler for updating a finance task"""
    # This would connect to the backend to update the task
    # For now, returning a mock response
    return {
        "task_id": request.task_id,
        "status": "updated",
        "title": request.title or "Sample Task"
    }