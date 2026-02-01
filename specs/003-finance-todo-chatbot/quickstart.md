# Quickstart Guide: Finance Todo AI Chatbot

## Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn
- Access to Neon PostgreSQL account
- OpenAI API key
- (Optional) Docker for containerized deployment

## Setup Instructions

### 1. Clone and Initialize
```bash
# Clone the repository
git clone <repository-url>
cd finance-todo-bot

# Create virtual environment for backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration
```bash
# Copy environment templates
cp .env.example .env
# Edit .env with your actual values:
# - OPENAI_API_KEY
# - DATABASE_URL (Neon PostgreSQL connection string)
# - AUTH_SECRET
```

### 3. Database Setup
```bash
# Run database migrations
cd backend
python -m scripts.migrate  # or however migrations are run in this project
```

### 4. Install Frontend Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install
```

### 5. Start Development Servers

Terminal 1 (Backend):
```bash
cd backend
uvicorn main:app --reload
```

Terminal 2 (MCP Server):
```bash
cd mcp_server
python server.py
```

Terminal 3 (Frontend):
```bash
cd frontend
npm run dev
```

## Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm run test
```

## Key Endpoints

### Backend API
- `POST /api/{user_id}/chat` - Main chat interface
- `GET /docs` - API documentation (Swagger UI)

### Frontend
- `http://localhost:3000` - Main chat interface

## Sample Usage

### Creating a Finance Task
1. Navigate to the chat interface
2. Authenticate with your credentials
3. Type: "Add a bill for electricity, $150, due next Friday"
4. The AI will create the task and confirm

### Managing Tasks
- "Show me my pending bills"
- "Mark the grocery task as completed"
- "Update the rent amount to $2000"

## Troubleshooting

### Common Issues
- **Database Connection**: Verify your Neon PostgreSQL connection string in `.env`
- **OpenAI API**: Ensure your API key is valid and has sufficient credits
- **Authentication**: Check that Better Auth is properly configured

### Debugging
- Enable detailed logging by setting `LOG_LEVEL=DEBUG` in `.env`
- Check the console for both frontend and backend error messages
- Verify all services are running (backend, MCP server, frontend)