# Start script for Finance Todo AI Chatbot

echo "Starting Finance Todo AI Chatbot..."

# Start backend server in the background
echo "Starting backend server..."
cd backend
python -m venv venv 2>nul || echo "Virtual environment already exists"
call venv\Scripts\activate.bat
pip install -r ../requirements.txt
start cmd /k "uvicorn main:app --reload"

# Start frontend server in the background
echo "Starting frontend server..."
cd ../frontend
npm install
start cmd /k "npm run dev"

echo "Both servers started!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
pause