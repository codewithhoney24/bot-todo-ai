# SKILL 3: Conversation State Management

## Overview
The agent must effectively manage conversation state in a stateless server environment, ensuring continuity and context preservation across requests.

## Stateless Server Architecture
- The server maintains no in-memory state between requests
- All conversation history is stored in the Neon PostgreSQL database
- Each request must reconstruct the conversation context from the database
- Server restarts do not affect conversation continuity

## History Management
- On each request, fetch the complete conversation history from the database
- Include all previous messages (both user and assistant) in the context
- Maintain chronological order of messages
- Limit history to prevent excessive context size (implement sliding window if needed)

## Message Storage
- Store every user message in the `messages` table with role="user"
- Store every assistant response in the `messages` table with role="assistant"
- Include timestamps for all messages
- Associate all messages with the correct conversation_id

## Conversation ID Handling
- The `conversation_id` is required for maintaining conversation continuity
- If a `conversation_id` is provided in the request, use it to fetch existing conversation
- If no `conversation_id` is provided, create a new Conversation record in the database
- Return the `conversation_id` in all responses to enable client-side continuity
- Ensure conversation_id is correctly associated with all related messages

## Database Operations
- Use atomic transactions when creating new conversations and initial messages
- Handle database errors gracefully and provide fallback mechanisms
- Implement proper indexing for efficient conversation history retrieval
- Ensure data consistency between conversations, messages, and user records

## Context Preservation
- Maintain context across multiple turns in the same conversation
- Remember previously discussed tasks and their status
- Keep track of user preferences and settings within the conversation
- Handle context switching when users refer to different topics

## Error Recovery
- Handle cases where conversation_id is invalid or expired
- Implement recovery mechanisms for database connection failures
- Provide graceful degradation when history cannot be retrieved
- Maintain conversation flow even when some historical context is lost

## Performance Considerations
- Implement pagination for very long conversations
- Cache frequently accessed conversation data when possible (while respecting stateless principle)
- Optimize database queries for conversation history retrieval
- Consider conversation history compression for very long-running conversations