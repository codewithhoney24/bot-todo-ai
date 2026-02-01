# FinanceTodoBot - API Specification

## Overview
This document specifies the API endpoints for the FinanceTodoBot application.

## Chat Endpoint

### Endpoint Details
| Property | Value |
|----------|-------|
| Method | POST |
| Endpoint | `/api/{user_id}/chat` |
| Description | Process user message and return AI-generated response with finance task operations |

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| conversation_id | integer | No | Existing conversation ID (auto-creates if missing) |
| message | string | Yes | User's natural language input |

#### Example Request
```json
{
  "conversation_id": 123,
  "message": "Remind me to pay my electricity bill of $150 by February 15th"
}
```

### Response Body
| Field | Type | Description |
|-------|------|-------------|
| conversation_id | integer | Current conversation ID |
| response | string | AI assistant reply |
| tool_calls | array | MCP tools that were invoked |

#### Example Response
```json
{
  "conversation_id": 123,
  "response": "I've added 'Pay electricity bill' to your bills with amount $150 due on 2025-02-15.",
  "tool_calls": [
    {
      "name": "add_finance_task",
      "arguments": {
        "user_id": "ziakhan",
        "title": "Pay electricity bill",
        "category": "bill",
        "amount": 150,
        "due_date": "2025-02-15"
      },
      "result": {
        "task_id": 45,
        "status": "created",
        "title": "Pay electricity bill",
        "category": "bill"
      }
    }
  ]
}
```

## Conversation Flow (Stateless Request Cycle)
1. **Receive**: Accept user message with optional conversation_id
2. **Fetch**: Retrieve conversation history from database
3. **Build**: Construct message array for agent (history + new message)
4. **Store**: Save user message in database
5. **Execute**: Run agent with MCP tools
6. **Process**: Agent invokes appropriate MCP tool(s)
7. **Save**: Store assistant response in database
8. **Return**: Send response to client
9. **Reset**: Server holds no state (ready for next request)

## Error Responses
| HTTP Status | Error Type | Description |
|-------------|------------|-------------|
| 400 | BadRequest | Invalid request parameters |
| 401 | Unauthorized | Invalid or missing authentication |
| 404 | NotFound | Conversation or task not found |
| 500 | InternalServerError | Server-side processing error |