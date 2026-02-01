# FinanceTodoBot - Main Specification

## Project Overview

### Project Name
FinanceTodoBot

### Executive Summary
FinanceTodoBot is an AI-powered chatbot that helps users manage finance-related tasks through natural language. Unlike generic todo applications, this system focuses exclusively on personal finance management, enabling users to track bills, budgets, savings goals, investments, subscriptions, tax obligations, and shared expenses through conversational AI.

### Core Objectives
- Enable natural language interaction for personal finance task management
- Provide a seamless interface for tracking financial obligations and goals
- Support multiple finance categories including bills, budgets, savings, investments, subscriptions, taxes, and expenses
- Maintain conversation context and task state in a persistent database
- Implement a scalable, stateless architecture using MCP tools

### Target Users
- Individuals seeking to manage personal finances through conversational AI
- People who prefer voice/text-based interfaces for financial planning
- Users who need reminders and tracking for recurring financial obligations

## Architecture Overview

### System Architecture
The FinanceTodoBot follows a stateless microservices architecture pattern with the following components:

```
┌─────────────────┐     ┌──────────────────────────────────────────────┐     ┌─────────────────┐
│                 │     │              FastAPI Server                   │     │                 │
│                 │     │  ┌────────────────────────────────────────┐  │     │    Neon DB      │
│  ChatKit UI     │────▶│  │         Chat Endpoint                  │  │     │  (PostgreSQL)   │
│  (Frontend)     │     │  │  POST /api/chat                        │  │     │                 │
│                 │     │  └───────────────┬────────────────────────┘  │     │  - finance_tasks │
│                 │     │                  │                           │     │  - conversations │
│                 │     │                  ▼                           │     │  - messages      │
│                 │     │  ┌────────────────────────────────────────┐  │     │                 │
│                 │◀────│  │      OpenAI Agents SDK                 │  │     │                 │
│                 │     │  │      (Agent + Runner)                  │  │     │                 │
│                 │     │  └───────────────┬────────────────────────┘  │     │                 │
│                 │     │                  │                           │     │                 │
│                 │     │                  ▼                           │     │                 │
│                 │     │  ┌────────────────────────────────────────┐  │────▶│                 │
│                 │     │  │         MCP Server                 │  │     │                 │
│                 │     │  │  (MCP Tools for Finance Task Ops)      │  │◀────│                 │
│                 │     │  └────────────────────────────────────────┘  │     │                 │
└─────────────────┘     └──────────────────────────────────────────────┘     └─────────────────┘
```

### Technology Stack
| Component        | Technology                      |
|------------------|---------------------------------|
| Frontend         | OpenAI ChatKit                  |
| Backend          | Python FastAPI                  |
| AI Framework     | OpenAI Agents SDK               |
| MCP Server       | Official MCP SDK                |
| ORM              | SQLModel                        |
| Database         | Neon Serverless PostgreSQL      |
| Authentication   | Better Auth                     |

### Key Architecture Principles
- **Statelessness**: The server maintains no in-memory state between requests
- **Persistence**: All conversation and task data stored in database
- **Scalability**: Horizontal scaling enabled by stateless design
- **Resilience**: Server restarts don't affect conversation continuity
- **Separation of Concerns**: MCP tools handle business logic separately from AI orchestration