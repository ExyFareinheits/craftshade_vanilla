@echo off
echo ====================================
echo   Craftshade Website - Dev Server
echo ====================================
echo.

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo Server will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
