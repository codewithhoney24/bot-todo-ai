import { NextRequest, NextResponse } from 'next/server';

// Mock MCP Tool responses
const mockMcpTools = {
  add_task: (title: string, description?: string) => ({
    task_id: Math.floor(Math.random() * 1000),
    status: 'created',
    title,
    description: description || '',
  }),
  list_tasks: (status: string = 'all') => ({
    tasks: [
      { id: 1, title: 'Pay utility bills', completed: false, category: 'bills' },
      { id: 2, title: 'Review monthly budget', completed: false, category: 'budgeting' },
      { id: 3, title: 'Set up emergency fund', completed: true, category: 'savings' },
    ].filter((t) => status === 'all' || (status === 'pending' && !t.completed) || (status === 'completed' && t.completed)),
  }),
  complete_task: (taskId: number) => ({
    task_id: taskId,
    status: 'completed',
    message: `Task ${taskId} marked as complete`,
  }),
  delete_task: (taskId: number) => ({
    task_id: taskId,
    status: 'deleted',
    message: `Task ${taskId} has been removed`,
  }),
};

// AI Response Engine (Simulated)
function generateAIResponse(userMessage: string): {
  response: string;
  toolCalls: Array<{ tool: string; params: Record<string, unknown> }>;
} {
  const lowerMessage = userMessage.toLowerCase();

  // Task creation
  if (
    lowerMessage.includes('add') ||
    lowerMessage.includes('create') ||
    lowerMessage.includes('remember') ||
    lowerMessage.includes('save')
  ) {
    const match = userMessage.match(/(?:add|create|remember|save)\s+(?:a\s+)?(?:task\s+)?(?:to\s+)?(.+)/i);
    if (match) {
      const taskTitle = match[1].trim();
      return {
        response: `✅ I've added a new task: "${taskTitle}". I'll help you track this financial task!`,
        toolCalls: [{ tool: 'add_task', params: { title: taskTitle } }],
      };
    }
  }

  // Task listing
  if (
    lowerMessage.includes('show') ||
    lowerMessage.includes('list') ||
    lowerMessage.includes('what') ||
    lowerMessage.includes('pending') ||
    lowerMessage.includes('completed')
  ) {
    if (lowerMessage.includes('pending') || lowerMessage.includes('what')) {
      return {
        response:
          "📋 Here are your pending tasks:\n• Pay utility bills\n• Review monthly budget\n\nWould you like to complete any of these tasks?",
        toolCalls: [{ tool: 'list_tasks', params: { status: 'pending' } }],
      };
    }
    if (lowerMessage.includes('completed')) {
      return {
        response:
          "✨ Great work! You've completed:\n• Set up emergency fund\n\nKeep up the excellent financial habits!",
        toolCalls: [{ tool: 'list_tasks', params: { status: 'completed' } }],
      };
    }
    return {
      response:
        "📊 Your Financial Tasks:\n\n**Pending (2):**\n• Pay utility bills\n• Review monthly budget\n\n**Completed (1):**\n• Set up emergency fund\n\nWhat would you like to do next?",
      toolCalls: [{ tool: 'list_tasks', params: { status: 'all' } }],
    };
  }

  // Task completion
  if (lowerMessage.includes('done') || lowerMessage.includes('complete') || lowerMessage.includes('finished')) {
    const match = userMessage.match(/(?:mark|complete)\s+(?:task\s+)?(\d+)/i);
    if (match) {
      const taskId = parseInt(match[1], 10);
      return {
        response: `🎉 Excellent! I've marked task ${taskId} as completed. Keep up the great work on managing your finances!`,
        toolCalls: [{ tool: 'complete_task', params: { task_id: taskId } }],
      };
    }
    return {
      response:
        "Great! Could you tell me which task you'd like to mark as complete? You can say something like 'mark task 1 as done' or 'complete paying bills'.",
      toolCalls: [],
    };
  }

  // Task deletion
  if (lowerMessage.includes('delete') || lowerMessage.includes('remove') || lowerMessage.includes('cancel')) {
    const match = userMessage.match(/(?:delete|remove|cancel)\s+(?:task\s+)?(\d+)/i);
    if (match) {
      const taskId = parseInt(match[1], 10);
      return {
        response: `🗑️ I've removed task ${taskId} from your list.`,
        toolCalls: [{ tool: 'delete_task', params: { task_id: taskId } }],
      };
    }
  }

  // Default helpful response
  return {
    response:
      "💡 I can help you manage your financial tasks! You can:\n• Add tasks (e.g., 'Add a task to pay bills')\n• View your tasks (e.g., 'Show me my pending tasks')\n• Mark tasks complete (e.g., 'Mark task 1 as done')\n• Remove tasks (e.g., 'Delete task 2')\n\nWhat would you like to do?",
    toolCalls: [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    console.log('[v0] Chat message received:', message);

    // Get AI response
    const { response, toolCalls } = generateAIResponse(message);

    // Execute mock MCP tools
    for (const call of toolCalls) {
      console.log('[v0] Executing tool:', call.tool, call.params);
      // In production, these would call the real MCP server
    }

    return NextResponse.json({
      response,
      conversationId: conversationId || Date.now(),
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
    });
  } catch (error) {
    console.error('[v0] Chat error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
