# SKILL 5: FastAPI + ChatKit Integration

## Overview
The agent must understand how to properly integrate with FastAPI backend and OpenAI ChatKit frontend to create a seamless user experience.

## API Endpoint Structure
- Single POST endpoint: `/api/{user_id}/chat`
- Path parameter: `user_id` (required) - identifies the authenticated user
- Request body accepts optional `conversation_id` and required `message`
- Response includes `conversation_id`, `response` text, and `tool_calls` array

## CORS Configuration
- Configure CORS middleware to allow ChatKit origin
- Permit necessary headers for ChatKit communication
- Handle preflight requests appropriately
- Secure configuration to prevent unauthorized origins

## Request Processing
- Extract `user_id` from path parameters
- Parse optional `conversation_id` from request body
- Extract user `message` from request body
- Validate required fields before processing
- Handle malformed requests gracefully

## Response Format
The response must follow this exact structure:
```
{
  "conversation_id": integer,
  "response": string,
  "tool_calls": array
}
```

### conversation_id
- Return the conversation ID for continuity
- If new conversation was created, return the new ID
- If existing conversation, return the same ID

### response
- Provide the AI-generated response to the user's message
- Include confirmation of any actions taken
- Format information clearly and concisely
- Maintain conversational tone

### tool_calls
- Include array of all MCP tools that were invoked
- Each tool call should include name, arguments, and results
- Format consistently for client-side processing
- Include error information if tool calls failed

## Better Auth Integration
- Implement authentication middleware to validate user identity
- Extract user information from authentication token
- Ensure all operations are performed under authenticated user context
- Handle authentication failures gracefully

## Error Handling
- Catch and format API errors appropriately
- Return meaningful error messages to the client
- Log errors for debugging while protecting sensitive information
- Handle rate limiting and resource constraints

## Performance Considerations
- Optimize database queries for fast response times
- Implement caching where appropriate while respecting stateless architecture
- Handle concurrent requests efficiently
- Monitor and optimize slow operations

## Security Measures
- Validate all user inputs to prevent injection attacks
- Sanitize data before storing in database
- Protect against cross-site scripting (XSS) and CSRF attacks
- Ensure secure transmission of sensitive financial data

## Integration Testing
- Test the complete flow from ChatKit to FastAPI to MCP tools
- Verify proper error propagation from tools to frontend
- Test conversation continuity across multiple requests
- Validate authentication and authorization workflows