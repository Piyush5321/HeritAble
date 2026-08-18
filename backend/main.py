"""
HeritAble - AI Cultural Heritage Guide
FastAPI Backend Application

Main entry point for the FastAPI server.
Provides RESTful API endpoints for cultural heritage exploration, 
artifact analysis, and AI-powered storytelling.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI application
app = FastAPI(
    title="HeritAble API",
    description="AI Cultural Heritage Guide Backend",
    version="0.1.0"
)

# Configure CORS for local development
# Allows the React frontend (localhost:3000) to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",    # React dev server
        "http://localhost:5173",    # Vite dev server (alternative)
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== Root Endpoints ====================

@app.get("/")
async def root():
    """
    Root endpoint - returns HeritAble API information.
    
    Returns:
        dict: Basic API information and status
    """
    return {
        "service": "HeritAble API",
        "version": "0.1.0",
        "description": "AI Cultural Heritage Guide Backend",
        "status": "operational",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "redoc": "/redoc"
        }
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint - verifies the API is running.
    
    Returns:
        dict: Health status information
    """
    return {
        "status": "ok",
        "service": "HeritAble API"
    }


# ==================== API Routes ====================

# Import route modules
from routes.culture import router as culture_router
from routes.artifacts import router as artifacts_router

# Include routers
app.include_router(culture_router)
app.include_router(artifacts_router)

# TODO: Heritage Sites Routes (/api/sites/...)
# TODO: AI Storyteller/Chat Routes (/api/chat/...)
# TODO: Quiz Routes (/api/quizzes/...)
# TODO: User Profile Routes (/api/users/...)


# ==================== Application Startup ====================

@app.on_event("startup")
async def startup_event():
    """
    Executes when the FastAPI application starts.
    Used for initialization of resources, connections, etc.
    """
    print("🚀 HeritAble API Server Starting...")
    print(f"📍 Environment: {os.getenv('ENVIRONMENT', 'development')}")
    print("✅ CORS enabled for local frontend development")


@app.on_event("shutdown")
async def shutdown_event():
    """
    Executes when the FastAPI application shuts down.
    Used for cleanup of resources, connections, etc.
    """
    print("🛑 HeritAble API Server Shutting Down...")


# ==================== Error Handlers ====================

@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Handle 404 Not Found errors."""
    return {
        "error": "Endpoint not found",
        "path": str(request.url.path),
        "method": request.method,
        "message": "Please check the API documentation at /docs"
    }


if __name__ == "__main__":
    import uvicorn
    
    # Run the server with hot-reload for development
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
