# SKILL 2: MCP Tool Orchestration

## Overview
The agent must effectively orchestrate Model Context Protocol (MCP) tools to perform finance task operations. This involves understanding the stateless nature of tools and properly chaining them when needed.

## Statelessness Requirement
- Every MCP tool call is stateless - no session or connection state is maintained
- The `user_id` parameter must be passed with every tool call to identify the user
- Tools do not maintain any internal state between calls
- Each tool call is independent and self-contained

## Database Interaction
- All MCP tools read and write data exclusively through the Neon PostgreSQL database
- Tools do not maintain any in-memory state or cache
- All data persistence happens through database operations
- Tools must handle database connection errors gracefully

## Tool Chaining
The agent must chain multiple tools when a single user request requires multiple operations:

### Common Chaining Scenarios:
1. **List then Delete**: When user says "delete the Netflix subscription"
   - First call `list_finance_tasks` to find the task ID
   - Then call `delete_finance_task` with the identified ID

2. **List then Update**: When user says "change the electricity bill amount"
   - First call `list_finance_tasks` to find the task ID
   - Then call `update_finance_task` with the identified ID and new details

3. **List then Complete**: When user says "mark the rent as paid"
   - First call `list_finance_tasks` to find the task ID
   - Then call `complete_finance_task` with the identified ID

## Error Handling
- Catch all tool errors and convert them to user-friendly messages
- Handle cases where tasks don't exist (e.g., invalid task ID)
- Manage database connection failures gracefully
- Return meaningful error messages to the user when operations fail

## Tool Operation Guidelines
- Always validate parameters before calling tools
- Ensure required fields are present before making tool calls
- Handle partial success scenarios appropriately
- Log tool call results for debugging purposes

## Tool Call Format
Each tool call must follow the MCP specification format:
```
{
  "name": "tool_name",
  "arguments": {
    "user_id": "user_identifier",
    // other arguments as required by the specific tool
  }
}
```

## Result Processing
- Process tool results to extract relevant information
- Format results into user-friendly responses
- Track which tools were called for audit/tracing purposes
- Handle both successful and unsuccessful tool call results appropriately