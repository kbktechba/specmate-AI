@echo off
echo Starting SpecMate AI Backend and Frontend...
echo.
start cmd /k "cd backend && .\venv\Scripts\python.exe -m uvicorn main:app --reload"
start cmd /k "cd frontend && npm run dev -- -p 3005"
start cmd /k "cd portal && npm run dev -- -p 3001"
echo Servers are starting in three new command prompt windows.
echo You can minimize those windows while you work.
