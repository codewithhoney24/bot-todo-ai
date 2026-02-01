# SKILL 4: Natural Language Parsing

## Overview
The agent must effectively parse natural language input to extract structured data including amounts, dates, and categories from user requests.

## Amount Parsing
The agent must recognize and extract monetary amounts from various formats:

### Currency Recognition
- Detect currency symbols: $, €, £, ¥, Rs, PKR, USD, etc.
- Handle implicit local currency when no symbol is present
- Convert currency abbreviations to standardized formats

### Numerical Formats
- Standard numbers: "500", "1250", "10000"
- Decimal amounts: "15.99", "1250.50", "99.95"
- Thousand separators: "1,250", "10,000", "1,250,000"
- Abbreviated formats: "2k" = 2000, "1.5M" = 1500000, "500k" = 500000
- Regional formats: "1.5 lakh" = 150000, "2 crore" = 20000000

### Amount Context
- Identify amounts in context: "pay 2000 rupees", "save $500 monthly"
- Handle fractional amounts: "half", "quarter", "two-thirds"
- Extract amounts from compound phrases: "rent of 25000", "bill for $75"

## Date Parsing
The agent must identify temporal references and convert them to ISO date format (YYYY-MM-DD):

### Absolute Dates
- ISO format: "2025-03-15"
- Standard formats: "March 15th, 2025", "15/03/2025", "03/15/2025"
- Verbose formats: "the fifteenth of March, twenty twenty-five"

### Relative Dates
- Days: "tomorrow", "today", "yesterday", "day after tomorrow"
- Weekdays: "next Monday", "this Friday", "last Tuesday"
- Weeks: "in 2 weeks", "next week", "week after next"
- Months: "next month", "in 3 months", "by month end"
- Years: "next year", "in 6 months", "by year end"

### Temporal Phrases
- Business terms: "by EOD", "by COB", "ASAP", "immediately"
- Common phrases: "this weekend", "before March", "by quarter end"
- Relative periods: "within a week", "in the next few days", "by month end"

## Category Detection
The agent must infer appropriate finance categories from contextual clues:

### Context Clues for Categories
- Bill: payment verbs ("pay", "settle"), utility terms ("electricity", "water", "gas", "rent")
- Savings: saving verbs ("save", "accumulate", "put aside"), goal terms ("emergency fund", "vacation fund")
- Investment: investment terms ("invest", "stocks", "shares", "mutual funds", "SIP")
- Subscription: subscription terms ("subscribe", "renew", "membership", "monthly fee")
- Tax: tax terms ("tax", "filing", "returns", "deadline")
- Expense: expense terms ("expense", "cost", "shared", "split")

## Ambiguity Resolution
- When data is missing, ask ONE question at a time for clarification
- If amount is unclear, ask: "Could you specify the amount for this task?"
- If date is uncertain, ask: "When would you like this task to be due?"
- If category is ambiguous, ask: "Is this related to bills, savings, or another category?"

## Validation
- Validate extracted amounts are positive numbers
- Validate dates are reasonable (not in the distant past or too far in the future)
- Cross-reference extracted data with user intent to ensure accuracy
- Flag suspicious values for confirmation

## Error Handling
- If parsing fails completely, acknowledge the limitation politely
- If multiple interpretations exist, ask for clarification
- If partial information is extracted, use what's available and ask for missing parts
- Provide helpful suggestions when input format is unclear