# SKILL 1: Finance Domain Understanding

## Overview
The agent must possess deep understanding of the finance domain to properly categorize and process user requests related to personal finance management.

## Knowledge Requirements

### Finance Categories
The agent must recognize and properly classify tasks into the following 8 categories:
- `bill`: Regular bills like utilities, rent, loans, insurance premiums
- `budget`: Budget planning and tracking tasks
- `savings`: Savings goals and targets
- `investment`: Investment-related tasks (stocks, bonds, mutual funds, etc.)
- `subscription`: Subscription payments and renewals (Netflix, Spotify, gym memberships)
- `tax`: Tax-related obligations and deadlines
- `expense`: General expense tracking and shared costs
- `other`: Miscellaneous finance tasks that don't fit other categories

### Amount Extraction
The agent must automatically extract monetary amounts from natural language:
- Recognize currency indicators (PKR, USD, etc.) or assume local currency
- Convert numerical expressions: "2k" = 2000, "1.5 lakh" = 150000, "half million" = 500000
- Handle decimal amounts: "15.50", "2,500.75"
- Extract amounts from context: "pay 2000 rupees", "save $500"

### Due Date Extraction
The agent must identify temporal references and convert them to ISO date format:
- Absolute dates: "2025-03-15", "March 15th, 2025"
- Relative dates: "tomorrow", "next Friday", "in 2 weeks", "by month end"
- Common phrases: "by EOD", "this weekend", "before March"

## Synonym Recognition
The agent must map common expressions to appropriate categories:

### Bill Category Synonyms
- Payment-related: "pay", "settle", "clear", "remittance", "transfer"
- Bill types: "electricity bill", "water bill", "gas bill", "phone bill", "internet bill"
- Utility payments: "utility", "monthly bill", "service charge"

### Savings Category Synonyms
- Saving-related: "save", "savings", "put aside", "accumulate", "reserve", "emergency fund"
- Goals: "save for", "building fund", "savings target"

### Investment Category Synonyms
- Investment-related: "invest", "buy stocks", "purchase shares", "mutual funds", "SIP"
- Terms: "portfolio", "dividend", "capital gain", "equity"

### Subscription Category Synonyms
- Subscription-related: "subscribe", "renew", "membership", "monthly fee"
- Services: "streaming service", "gym", "software license", "cloud storage"

### Tax Category Synonyms
- Tax-related: "tax", "filing", "returns", "income tax", "property tax", "GST"
- Deadlines: "tax season", "filing deadline", "payment due"

### Expense Category Synonyms
- Expense-related: "expense", "cost", "expenditure", "shared cost", "split bill"
- Tracking: "track expense", "log cost", "record spending"

## Conversion Rules
- Currency conversion: Recognize PKR, USD, EUR, etc. and handle appropriately
- Number formats: Convert "2k" to 2000, "1.5M" to 1500000, "1.5 lakh" to 150000
- Regional formats: Handle local number formats (e.g., lakh, crore in South Asia)

## Error Handling
- If category is unclear, ask for clarification
- If amount is ambiguous, seek clarification
- If date is uncertain, confirm with user before proceeding