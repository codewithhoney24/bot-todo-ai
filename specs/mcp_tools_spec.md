# FinanceTodoBot - MCP Tools Specification

## Overview
This document specifies the Model Context Protocol (MCP) tools that the AI agent will use to interact with the finance task management system.

## Tool: add_finance_task
- **Purpose**: Create a new finance task
- **Function Signature**: `add_finance_task(user_id: str, title: str, description: str = None, category: str, amount: float = None, due_date: str = None)`
- **Parameters**:
  - `user_id` (string, required): Unique identifier of the user
  - `title` (string, required): Title of the finance task
  - `description` (string, optional): Detailed description of the task
  - `category` (string, required): Category of the task (bill, budget, savings, investment, subscription, tax, expense, other)
  - `amount` (float, optional): Monetary amount associated with the task
  - `due_date` (string, optional): Due date in ISO format (YYYY-MM-DD)
- **Returns**: `{ task_id: integer, status: "created", title: string, category: string }`
- **Example Input**: `{"user_id":"ziakhan","title":"Pay electricity bill","category":"bill","amount":1500,"due_date":"2025-02-15"}`
- **Example Output**: `{"task_id": 5, "status": "created", "title": "Pay electricity bill", "category": "bill"}`

## Tool: list_finance_tasks
- **Purpose**: Retrieve finance tasks with filters
- **Function Signature**: `list_finance_tasks(user_id: str, status: str = None, category: str = None)`
- **Parameters**:
  - `user_id` (string, required): Unique identifier of the user
  - `status` (string, optional): Filter by status ("all", "pending", "completed")
  - `category` (string, optional): Filter by category (bill, budget, savings, investment, subscription, tax, expense, other)
- **Returns**: Array of task objects with fields: id, title, description, category, amount, due_date, completed
- **Example Input**: `{"user_id":"ziakhan","status":"pending","category":"bill"}`
- **Example Output**: `[{"id": 1, "title": "Pay electricity bill", "category": "bill", "amount": 1500, "due_date": "2025-02-15", "completed": false}, ...]`

## Tool: complete_finance_task
- **Purpose**: Mark a finance task as done
- **Function Signature**: `complete_finance_task(user_id: str, task_id: int)`
- **Parameters**:
  - `user_id` (string, required): Unique identifier of the user
  - `task_id` (integer, required): ID of the task to mark as complete
- **Returns**: `{ task_id: integer, status: "completed", title: string }`
- **Example Input**: `{"user_id":"ziakhan","task_id": 3}`
- **Example Output**: `{"task_id": 3, "status": "completed", "title": "Pay credit card bill"}`

## Tool: delete_finance_task
- **Purpose**: Remove a finance task
- **Function Signature**: `delete_finance_task(user_id: str, task_id: int)`
- **Parameters**:
  - `user_id` (string, required): Unique identifier of the user
  - `task_id` (integer, required): ID of the task to delete
- **Returns**: `{ task_id: integer, status: "deleted", title: string }`
- **Example Input**: `{"user_id":"ziakhan","task_id": 2}`
- **Example Output**: `{"task_id": 2, "status": "deleted", "title": "Cancel old subscription"}`

## Tool: update_finance_task
- **Purpose**: Modify task fields
- **Function Signature**: `update_finance_task(user_id: str, task_id: int, title: str = None, description: str = None, category: str = None, amount: float = None, due_date: str = None)`
- **Parameters**:
  - `user_id` (string, required): Unique identifier of the user
  - `task_id` (integer, required): ID of the task to update
  - `title` (string, optional): New title for the task
  - `description` (string, optional): New description for the task
  - `category` (string, optional): New category for the task
  - `amount` (float, optional): New monetary amount
  - `due_date` (string, optional): New due date in ISO format
- **Returns**: `{ task_id: integer, status: "updated", title: string }`
- **Example Input**: `{"user_id":"ziakhan","task_id": 1, "title": "Pay water and electricity bills", "amount": 2500}`
- **Example Output**: `{"task_id": 1, "status": "updated", "title": "Pay water and electricity bills"}`