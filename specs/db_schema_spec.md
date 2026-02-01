# FinanceTodoBot - Database Schema Specification

## Overview
This document specifies the database schema for the FinanceTodoBot application using SQLModel.

## FinanceTask Model
The FinanceTask model represents finance-related tasks that users need to manage.

```sql
Table: finance_tasks
Columns:
- id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- user_id (STRING, NOT NULL) - Foreign key to user
- title (STRING, NOT NULL, MAX 255) - Task title
- description (TEXT, OPTIONAL) - Detailed task description
- category (STRING, NOT NULL) - Enum: bill, budget, savings, investment, subscription, tax, expense, other
- amount (DECIMAL, OPTIONAL) - Monetary amount associated with the task
- due_date (DATE, OPTIONAL) - Due date for the task
- completed (BOOLEAN, DEFAULT FALSE) - Completion status
- created_at (TIMESTAMP, DEFAULT NOW) - Creation timestamp
- updated_at (TIMESTAMP, DEFAULT NOW, ON UPDATE) - Last update timestamp
```

## Conversation Model
The Conversation model tracks chat sessions between users and the bot.

```sql
Table: conversations
Columns:
- id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- user_id (STRING, NOT NULL) - Foreign key to user
- created_at (TIMESTAMP, DEFAULT NOW) - Session creation timestamp
- updated_at (TIMESTAMP, DEFAULT NOW, ON UPDATE) - Last activity timestamp
```

## Message Model
The Message model stores the conversation history between users and the AI assistant.

```sql
Table: messages
Columns:
- id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- user_id (STRING, NOT NULL) - Foreign key to user
- conversation_id (INTEGER, NOT NULL) - Foreign key to conversation
- role (STRING, NOT NULL) - Enum: user, assistant
- content (TEXT, NOT NULL) - Message content
- created_at (TIMESTAMP, DEFAULT NOW) - Message timestamp
```

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

## Indexes
The following indexes should be created for optimal performance:
- Index on `finance_tasks.user_id` for quick user-based queries
- Composite index on `finance_tasks.user_id` and `finance_tasks.completed` for filtered queries
- Index on `conversations.user_id` for user-based conversation retrieval
- Index on `messages.conversation_id` for conversation-based message retrieval