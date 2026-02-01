---
id: 1
title: "Update FinanceTodoBot Constitution"
stage: constitution
date_iso: "2026-01-31"
surface: "agent"
model: "default"
feature: "none"
branch: "main"
user: "user"
command: "/sp.constitution"
labels:
  - "constitution"
  - "finance-todo-bot"
  - "governance"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - ".specify/memory/constitution.md"
  - ".specify/templates/plan-template.md"
  - ".specify/templates/spec-template.md"
  - ".specify/templates/tasks-template.md"
tests_yaml: []
prompt_text: |
  /sp.constitution

  # FinanceTodoBot — Project Constitution

  ## Identity
  - Name: FinanceTodoBot
  - Domain: Personal Finance Task Management
  - Audience: Individual users managing personal finances

  ## Core Principles
  1. STATELESS SERVER — all state lives in Neon DB
  2. FINANCE-FIRST — every task must have a category from the defined enum
  3. MCP AS SINGLE INTERFACE — agent never touches DB directly; only via MCP tools
  4. ONE QUESTION AT A TIME — never overwhelm user with multiple questions
  5. CONFIRM EVERY ACTION — user must know what happened after every tool call
  6. FAIL GRACEFULLY — errors become friendly messages, never crashes

  ## Tech Constraints (Non-Negotiable)
  - Frontend: OpenAI ChatKit only
  - Backend: Python FastAPI only
  - AI: OpenAI Agents SDK only
  - MCP: Official MCP SDK only
  - DB: Neon PostgreSQL + SQLModel ORM only
  - Auth: Better Auth only

  ## What Is OUT OF SCOPE
  - Multi-user collaboration (single user per session)
  - Real-time budget tracking from bank APIs
  - Cryptocurrency tracking
  - Investment portfolio management
  - Tax calculation engine
  - Payment processing

  ## Security Rules
  - user_id is extracted from authenticated session (Better Auth)
  - Users can ONLY see/modify their own tasks
  - No raw SQL — ORM only
  - Sensitive data (amounts) logged only in debug mode
response_text: |
  Updated the FinanceTodoBot constitution with the specified principles and constraints. Created a comprehensive constitution document that includes:
  - Core principles (STATELESS SERVER, FINANCE-FIRST, MCP AS SINGLE INTERFACE, etc.)
  - Tech constraints (OpenAI ChatKit, Python FastAPI, etc.)
  - Out of scope items
  - Security rules
  Also updated dependent templates to align with the new constitution:
  - plan-template.md now includes constitution compliance checks
  - spec-template.md now includes constitution-based functional requirements
  - tasks-template.md now includes constitution-compliant implementation tasks
outcome: |
  Successfully updated the project constitution and aligned dependent templates with FinanceTodoBot principles.
evaluation: |
  The constitution update was completed successfully with all dependent templates updated to reflect the new principles. All required elements were included in the constitution document.
---

# FinanceTodoBot Constitution Update

The FinanceTodoBot constitution has been successfully updated with the specified principles and constraints. The following changes were made:

1. Created a comprehensive constitution document at `.specify/memory/constitution.md` that includes:
   - Core principles (STATELESS SERVER, FINANCE-FIRST, MCP AS SINGLE INTERFACE, etc.)
   - Tech constraints (OpenAI ChatKit, Python FastAPI, etc.)
   - Out of scope items
   - Security rules

2. Updated dependent templates to align with the new constitution:
   - plan-template.md now includes constitution compliance checks
   - spec-template.md now includes constitution-based functional requirements
   - tasks-template.md now includes constitution-compliant implementation tasks

The constitution is now properly established for the FinanceTodoBot project with version 1.0.0.