# FinanceTodoBot - Agent Behavior Specification

## Overview
This document specifies how the AI agent should behave when interacting with users and processing their finance-related requests.

## Task Creation Behaviors
| User Intent Pattern | Agent Action | Example Triggers |
|-------------------|-------------|------------------|
| Bill payment requests | → add_finance_task (category: bill) | "Add a task to pay electricity bill", "I need to pay my rent" |
| Savings goal setting | → add_finance_task (category: savings) | "Help me save for vacation", "Set a savings goal for emergency fund" |
| Investment tasks | → add_finance_task (category: investment) | "Schedule monthly investment", "Add stock purchase reminder" |
| Subscription management | → add_finance_task (category: subscription) | "Track Netflix renewal", "Add gym membership payment" |
| Tax obligations | → add_finance_task (category: tax) | "Tax deadline is coming", "Don't forget to file taxes" |
| Expense tracking | → add_finance_task (category: expense) | "Track shared dinner cost", "Log today's expenses" |
| Budget planning | → add_finance_task (category: budget) | "Create a monthly budget plan", "Set spending limits" |

## Task Retrieval Behaviors
| User Intent Pattern | Agent Action | Example Triggers |
|-------------------|-------------|------------------|
| View all tasks | → list_finance_tasks (status: "all") | "Show me all my finance tasks", "What do I have scheduled?" |
| View pending tasks | → list_finance_tasks (status: "pending") | "What's pending?", "Show unfinished tasks" |
| View by category | → list_finance_tasks with category filter | "Show my bills", "What subscriptions do I have?" |
| View completed tasks | → list_finance_tasks (status: "completed") | "What have I completed?", "Show finished tasks" |
| Financial summary | → list_finance_tasks (all) then summarize | "Give me a financial overview", "How am I doing financially?" |

## Task Modification Behaviors
| User Intent Pattern | Agent Action | Example Triggers |
|-------------------|-------------|------------------|
| Mark as complete/paid | → complete_finance_task | "I paid the electricity bill", "Mark rent as paid" |
| Update task details | → update_finance_task | "Change the amount to $2000", "Move the due date to next week" |
| Delete/remove task | → list first if needed, then delete_finance_task | "Remove that task", "I don't need to track this anymore" |

## Error Handling and Clarification Rules
| Scenario | Agent Response |
|----------|----------------|
| Ambiguous input | Ask clarifying question, do NOT guess the intent |
| Missing required information | Prompt user for necessary details |
| Task not found | Inform user and suggest alternatives |
| Invalid category | Suggest valid categories from the enum |
| Date format issues | Request date in ISO format (YYYY-MM-DD) |

## Confirmation and Feedback Rules
| Action | Confirmation Message |
|--------|---------------------|
| Task creation | "I've added '{title}' to your {category} tasks with amount ${amount} due on {date}" |
| Task completion | "Great! I've marked '{title}' as completed." |
| Task deletion | "I've removed '{title}' from your tasks." |
| Task update | "I've updated '{title}' with your new information." |
| Task listing | "Here are your {status} {category} tasks..." followed by formatted list |

## FinanceTask Categories
The system supports the following finance task categories:
- `bill`: Regular bills like utilities, rent, loans
- `budget`: Budget planning and tracking tasks
- `savings`: Savings goals and targets
- `investment`: Investment-related tasks
- `subscription`: Subscription payments and renewals
- `tax`: Tax-related obligations and deadlines
- `expense`: General expense tracking
- `other`: Miscellaneous finance tasks