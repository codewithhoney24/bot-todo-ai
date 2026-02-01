# Data Model: Finance Todo AI Chatbot

## Entity: FinanceTask

### Description
Represents a finance-related task with properties like title, description, category, amount, due date, and completion status, linked to a specific user.

### Fields
- **id**: Optional[int] = Field(default=None, primary_key=True)
  - Type: Integer (Auto-generated primary key)
  - Constraints: Unique, Auto-incrementing
  
- **user_id**: str = Field(index=True)
  - Type: String
  - Constraints: Indexed for fast lookup, Required
  - Validation: Must match user identifier format
  
- **title**: str
  - Type: String
  - Constraints: Required
  - Validation: Length between 1-255 characters
  
- **description**: Optional[str] = None
  - Type: String (Nullable)
  - Constraints: Optional field
  
- **category**: CategoryEnum
  - Type: Enum (bill|budget|savings|investment|subscription|tax|expense|other)
  - Constraints: Required, Valid enum value
  - Validation: Must be one of the predefined categories
  
- **amount**: Optional[float] = None
  - Type: Float (Nullable)
  - Constraints: Optional field
  - Validation: Positive values only if provided
  
- **due_date**: Optional[datetime] = None
  - Type: DateTime (Nullable)
  - Constraints: Optional field
  - Validation: Future date if provided
  
- **completed**: bool = False
  - Type: Boolean
  - Constraints: Default to False
  
- **created_at**: datetime = Field(default_factory=datetime.utcnow)
  - Type: DateTime
  - Constraints: Auto-populated on creation
  
- **updated_at**: datetime = Field(default_factory=datetime.utcnow)
  - Type: DateTime
  - Constraints: Auto-populated on update

### Relationships
- Belongs to: User (via user_id foreign key)
- Part of: Conversation (via conversation messages)

### Validation Rules
- User must own the task to modify it (FR-010)
- Category must be one of the predefined enums (FR-014)
- Amount must be positive if provided
- Due date must be in the future if provided

### State Transitions
- Pending (default) → Completed (via complete_finance_task operation)

## Entity: Conversation

### Description
Represents a thread of messages between a user and the AI assistant, maintaining context over time.

### Fields
- **id**: Optional[int] = Field(default=None, primary_key=True)
  - Type: Integer (Auto-generated primary key)
  - Constraints: Unique, Auto-incrementing
  
- **user_id**: str = Field(index=True)
  - Type: String
  - Constraints: Indexed for fast lookup, Required
  - Validation: Must match user identifier format
  
- **created_at**: datetime = Field(default_factory=datetime.utcnow)
  - Type: DateTime
  - Constraints: Auto-populated on creation
  
- **updated_at**: datetime = Field(default_factory=datetime.utcnow)
  - Type: DateTime
  - Constraints: Auto-populated on update

### Relationships
- Belongs to: User (via user_id foreign key)
- Contains: Messages (one-to-many relationship)

### Validation Rules
- User must own the conversation to access it (FR-010)
- Only the owner can add messages to the conversation

## Entity: Message

### Description
Represents an individual message within a conversation, either from the user or the assistant, with content and metadata.

### Fields
- **id**: Optional[int] = Field(default=None, primary_key=True)
  - Type: Integer (Auto-generated primary key)
  - Constraints: Unique, Auto-incrementing
  
- **user_id**: str = Field(index=True)
  - Type: String
  - Constraints: Indexed for fast lookup, Required
  - Validation: Must match user identifier format
  
- **conversation_id**: int = Field(foreign_key="conversation.id")
  - Type: Integer (Foreign key)
  - Constraints: References Conversation entity, Required
  
- **role**: str
  - Type: String
  - Constraints: Required
  - Values: "user" or "assistant"
  
- **content**: str
  - Type: String
  - Constraints: Required
  - Validation: Length between 1-10000 characters
  
- **created_at**: datetime = Field(default_factory=datetime.utcnow)
  - Type: DateTime
  - Constraints: Auto-populated on creation

### Relationships
- Belongs to: User (via user_id foreign key)
- Belongs to: Conversation (via conversation_id foreign key)

### Validation Rules
- User must own the message to access it (FR-010)
- Role must be either "user" or "assistant"
- Content must not be empty

## Enum: CategoryEnum

### Values
- bill
- budget
- savings
- investment
- subscription
- tax
- expense
- other

### Constraints
- Used in FinanceTask.category field
- Required field in FinanceTask
- Must be one of the predefined values