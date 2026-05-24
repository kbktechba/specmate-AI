Start-Process -FilePath "powershell" -ArgumentList "-NoExit -Command `"cd backend; .\venv\Scripts\python.exe -m uvicorn main:app --reload`""
Start-Process -FilePath "powershell" -ArgumentList "-NoExit -Command `"cd frontend; cmd.exe /c 'npm run dev -- -p 3005'`""
Start-Process -FilePath "powershell" -ArgumentList "-NoExit -Command `"cd portal; cmd.exe /c 'npm run dev -- -p 3001'`""
