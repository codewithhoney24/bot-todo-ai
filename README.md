# Finance Todo AI Chatbot

This is a finance-focused todo application with AI-powered features.

## Project Structure

- `frontend/` - Next.js application with the user interface
- `backend/` - Python backend with FastAPI
- `requirements.txt` - Python dependencies for the backend

## Deployment

The frontend is deployed on Vercel at: https://frontend-red-eight-52.vercel.app/

## Backend Setup

To run the backend locally:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

## Frontend Setup

To run the frontend locally:

```bash
cd frontend
npm install
npm run dev
```

## Current Status

✅ Local build: Working  
✅ Vercel deployment: Fixed  
✅ Path resolution: Fixed (`@/lib/utils` alias)  
✅ CORS configuration: Updated for multiple platforms