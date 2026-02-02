# MCP Tools Specification: Todo AI Chatbot

## Overview
This document defines the Machine Learning Control Protocol (MCP) tools that expose task operations for the AI agent to interact with the todo management system. These tools enable the AI to perform CRUD operations on tasks through standardized interfaces.

## Tool Definitions

### 1. add_task
**Purpose**: Creates a new task in the user's todo list
**Function Signature**:
```python
def add_task(user_id: str, title: str, priority: str = "medium", due_date: str = None) -> dict
```

**Parameters**:
- `user_id` (string, required): Unique identifier of the user
- `title` (string, required): Description of the task to be added
- `priority` (string, optional): Priority level ("low", "medium", "high") - defaults to "medium"
- `due_date` (string, optional): Due date in ISO 8601 format (YYYY-MM-DD) - defaults to None

**Returns**:
```json
{
  "success": true,
  "task_id": "unique-task-identifier",
  "message": "Task 'Pay electricity bill' added successfully"
}
```

**Example Usage**:
- User: "Add 'Buy groceries' to my todo list"
- AI: Calls `add_task(user_id="user123", title="Buy groceries")`

### 2. list_tasks
**Purpose**: Retrieves all tasks for a specific user with optional filtering
**Function Signature**:
```python
def list_tasks(user_id: str, status: str = None, priority: str = None) -> dict
```

**Parameters**:
- `user_id` (string, required): Unique identifier of the user
- `status` (string, optional): Filter by task status ("pending", "completed", "archived") - defaults to None (all statuses)
- `priority` (string, optional): Filter by priority ("low", "medium", "high") - defaults to None (all priorities)

**Returns**:
```json
{
  "success": true,
  "tasks": [
    {
      "id": "task1",
      "title": "Pay electricity bill",
      "status": "pending",
      "priority": "high",
      "due_date": "2023-12-15",
      "created_at": "2023-12-01T10:00:00Z"
    },
    {
      "id": "task2",
      "title": "Schedule dentist appointment",
      "status": "pending",
      "priority": "medium",
      "due_date": null,
      "created_at": "2023-12-02T14:30:00Z"
    }
  ],
  "count": 2
}
```

**Example Usage**:
- User: "What's pending?"
- AI: Calls `list_tasks(user_id="user123", status="pending")`

### 3. complete_task
**Purpose**: Marks a specific task as completed
**Function Signature**:
```python
def complete_task(user_id: str, task_id: str) -> dict
```

**Parameters**:
- `user_id` (string, required): Unique identifier of the user
- `task_id` (string, required): Unique identifier of the task to complete

**Returns**:
```json
{
  "success": true,
  "task_id": "task456",
  "message": "Task 'Submit quarterly report' marked as completed"
}
```

**Example Usage**:
- User: "Complete task 1"
- AI: Calls `complete_task(user_id="user123", task_id="task456")`

### 4. delete_task
**Purpose**: Permanently removes a task from the user's todo list
**Function Signature**:
```python
def delete_task(user_id: str, task_id: str) -> dict
```

**Parameters**:
- `user_id` (string, required): Unique identifier of the user
- `task_id` (string, required): Unique identifier of the task to delete

**Returns**:
```json
{
  "success": true,
  "task_id": "task789",
  "message": "Task 'Cancel subscription' deleted successfully"
}
```

**Example Usage**:
- User: "Remove 'Cancel subscription' from my list"
- AI: Calls `delete_task(user_id="user123", task_id="task789")`

### 5. update_task
**Purpose**: Modifies properties of an existing task
**Function Signature**:
```python
def update_task(user_id: str, task_id: str, title: str = None, priority: str = None, due_date: str = None, status: str = None) -> dict
```

**Parameters**:
- `user_id` (string, required): Unique identifier of the user
- `task_id` (string, required): Unique identifier of the task to update
- `title` (string, optional): New title for the task
- `priority` (string, optional): New priority level ("low", "medium", "high")
- `due_date` (string, optional): New due date in ISO 8601 format (YYYY-MM-DD)
- `status` (string, optional): New status ("pending", "completed", "archived")

**Returns**:
```json
{
  "success": true,
  "task_id": "task321",
  "message": "Task 'Renew license' updated successfully"
}
```

**Example Usage**:
- User: "Change the due date of 'Renew license' to next Friday"
- AI: Calls `update_task(user_id="user123", task_id="task321", due_date="2023-12-15")`

## Error Handling

### Common Error Responses
All tools return consistent error structures:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descriptive error message",
    "details": {}
  }
}
```

### Possible Error Codes
- `USER_NOT_FOUND`: The specified user does not exist
- `TASK_NOT_FOUND`: The specified task does not exist
- `INVALID_PARAMETER`: Provided parameters are invalid
- `PERMISSION_DENIED`: User does not have permission to perform the action
- `DATABASE_ERROR`: Internal database error occurred

## Implementation Notes
- All tools must validate user_id to ensure proper data isolation
- Tools should implement proper logging for audit purposes
- Rate limiting should be applied to prevent abuse
- Tools must be idempotent where possible (especially update operations)
- All datetime values should be in UTC and ISO 8601 format