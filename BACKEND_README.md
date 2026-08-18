# HeritAble Backend - FastAPI Setup Guide

> **Status**: ✅ Phase 1 Step 1 Complete  
> **Last Updated**: August 18, 2026  
> **Python Version**: 3.12.11  
> **FastAPI Version**: 0.125.0

---

## 🚀 Quick Start

### Start the Backend Server

```bash
cd backend
.\venv\bin\python.exe main.py
```

The server will start on `http://localhost:8000`

### Access API Documentation

- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc

### Test Health Endpoint

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status":"ok","service":"HeritAble API"}
```

---

## 📁 Backend Directory Structure

```
backend/
├── venv/                    # Virtual environment (Python packages)
├── ai/                      # AI module (coming in Phase 1 Step 2)
├── models/                  # Data models (Pydantic schemas)
├── routes/                  # API route handlers
├── services/                # Business logic services
├── utils/                   # Utility functions
├── main.py                  # FastAPI application entry point
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables (local)
└── .gitignore              # Git ignore rules
```

---

## 🔧 Installation & Setup

### Prerequisites

- Python 3.11 or newer (3.12.11 installed)
- pip package manager

### Initial Setup (Already Completed)

If you need to set up a fresh backend environment:

```bash
# 1. Create backend directory
mkdir backend
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
.\venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Start the server
python main.py
```

### Install New Dependencies

```bash
cd backend
.\venv\bin\python.exe -m pip install package-name
.\venv\bin\python.exe -m pip freeze > requirements.txt
```

---

## 📦 Installed Packages

The backend uses the following core packages:

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.125.0 | Web framework |
| uvicorn | 0.52.3 | ASGI server |
| pydantic | 1.10.26 | Data validation |
| python-dotenv | 1.2.3 | Environment variables |
| starlette | 0.50.0 | ASGI toolkit (FastAPI dependency) |

See `requirements.txt` for complete dependency tree (15 packages total).

---

## 🌐 API Endpoints

### Root Endpoint
```
GET /
```

Returns service information and available endpoints.

**Response**:
```json
{
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
```

### Health Check Endpoint
```
GET /health
```

Simple health check for monitoring.

**Response**:
```json
{
  "status": "ok",
  "service": "HeritAble API"
}
```

### Coming Soon (Phase 1 Step 2+)

- `/api/culture/*` - Cultural exploration endpoints
- `/api/sites/*` - Heritage sites endpoints
- `/api/artifacts/*` - Museum artifact endpoints
- `/api/chat/*` - AI storyteller endpoints
- `/api/quiz/*` - Quiz endpoints

---

## 🔒 CORS Configuration

The backend is configured for local development with the following allowed origins:

- `http://localhost:3000` (React Vite dev server)
- `http://localhost:5173` (Alternative Vite port)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

**CORS Settings**:
- Credentials: Allowed
- Methods: All
- Headers: All

This allows the React frontend to make requests to the backend during development.

---

## ⚙️ Configuration

### Environment Variables (.env)

The `.env` file in the `backend/` directory contains configuration:

```env
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Future additions (Phase 1 Step 2)**:
- `GEMINI_API_KEY` - Google Generative AI key
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase service account key
- `FIREBASE_CLIENT_EMAIL` - Firebase client email

### Development Mode

The server runs with:
- **Hot Reload**: Enabled (auto-restart on file changes)
- **Log Level**: info
- **Host**: 0.0.0.0 (all interfaces)
- **Port**: 8000

---

## 📚 Project Architecture

### Three-Tier Architecture

```
┌─────────────────┐
│   React Frontend │ (localhost:3000)
│ TypeScript/Vite  │
└────────┬─────────┘
         │ HTTP/REST + CORS
         ↓
┌─────────────────┐
│  FastAPI Backend │ (localhost:8000)
│   Python 3.12    │
└────────┬─────────┘
         │ 
         ↓
┌─────────────────┐
│  External APIs   │
│ - Gemini AI      │
│ - Firebase       │
│ - Whisper        │
└─────────────────┘
```

### Module Organization

**Phase 1 Structure**:
- `main.py` - Application entry point and routing
- `routes/` - API endpoint handlers
- `services/` - Business logic layer
- `models/` - Pydantic data models (validation)
- `ai/` - AI integrations (Gemini, etc.)
- `utils/` - Helper functions

---

## 🧪 Testing Endpoints

### Using curl

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test root endpoint
curl http://localhost:8000/

# Test with JSON
curl -X GET http://localhost:8000/health -H "Content-Type: application/json"
```

### Using PowerShell

```powershell
# Test health endpoint
Invoke-WebRequest -Uri "http://localhost:8000/health"

# Test root endpoint
Invoke-WebRequest -Uri "http://localhost:8000/" | ConvertFrom-Json
```

### Using Browser

Simply visit:
- http://localhost:8000/ (root endpoint)
- http://localhost:8000/health (health check)
- http://localhost:8000/docs (API documentation)

---

## 🔄 Development Workflow

### 1. Start Frontend
```bash
# In project root
npm run dev
# Frontend runs on http://localhost:3000
```

### 2. Start Backend
```bash
# In new terminal, in backend directory
cd backend
.\venv\bin\python.exe main.py
# Backend runs on http://localhost:8000
```

### 3. Make Changes
- Edit frontend files → auto-reloads (Vite)
- Edit backend files → auto-reloads (FastAPI reload=True)

### 4. Test Integration
- Open http://localhost:3000 (React frontend)
- Frontend can now make API calls to backend endpoints
- Check browser console for CORS issues (if any)

---

## 📋 Deployment Checklist

### Before Production
- [ ] Change ENVIRONMENT from "development" to "production"
- [ ] Disable hot reload (reload=False)
- [ ] Set up proper CORS origins (not all localhost)
- [ ] Configure production database
- [ ] Set up environment secrets securely
- [ ] Enable HTTPS/SSL
- [ ] Set up logging and monitoring
- [ ] Run security audit
- [ ] Test with production-like data

### Deployment Command
```bash
# Production run (no reload)
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🐛 Troubleshooting

### Port Already in Use
```
Address already in use
```
**Solution**: Change port in .env or kill existing process

```bash
# Find process using port 8000 (Windows)
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### CORS Issues
If frontend gets CORS errors:
1. Check allowed origins in `main.py`
2. Verify frontend URL matches allowed origins
3. Clear browser cache
4. Check network tab in browser DevTools

### Import Errors
If getting import errors when running backend:
```bash
# Verify virtual environment is activated
cd backend

# Reinstall dependencies
.\venv\bin\python.exe -m pip install -r requirements.txt

# Check installation
.\venv\bin\python.exe -c "import fastapi; print(fastapi.__version__)"
```

---

## 📖 Additional Resources

### FastAPI Documentation
- Official: https://fastapi.tiangolo.com/
- API Reference: https://fastapi.tiangolo.com/api/

### Pydantic Documentation
- Official: https://docs.pydantic.dev/
- Models: https://docs.pydantic.dev/latest/api/

### Uvicorn Documentation
- Official: https://www.uvicorn.org/
- Configuration: https://www.uvicorn.org/deployment/

### Project Documentation
- Project Overview: `PROJECT_DOCUMENTATION.md`
- Phase 1 Step 1 Report: `PHASE1_STEP1_COMPLETION.md`
- Backend Setup Report: `BACKEND_SETUP_REPORT.md`

---

## 🔐 Security Best Practices

✅ **Implemented**:
- Environment variables for secrets (.env)
- CORS configuration for development
- Type hints and validation (Pydantic)
- Error handling and logging

⚠️ **Before Production**:
- Never commit `.env` to git
- Use strong API keys
- Implement authentication
- Add rate limiting
- Enable HTTPS
- Use secure headers
- Validate all inputs
- Implement request signing

---

## 📝 Git Workflow

### Ignoring Files

The `.gitignore` is configured to exclude:
- `venv/` - Virtual environment
- `__pycache__/` - Python cache
- `.env` - Local environment variables
- `*.pyc` - Compiled Python files
- IDE files - `.vscode/`, `.idea/`

### Safe to Commit
- `main.py` - Application code
- `requirements.txt` - Dependencies
- `.env.example` - Template (if created)
- `README.md` - Documentation
- `.gitignore` - Git rules

---

## 🚀 Next Steps

### Phase 1 Step 2: Integration
Upcoming improvements to integrate:
1. Gemini AI for cultural storytelling
2. Firebase Admin SDK for database
3. User authentication endpoints
4. Cultural exploration routes

### Phase 2+
- Advanced API endpoints
- Database models
- Authentication system
- Admin dashboard
- Performance optimization

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review `PHASE1_STEP1_COMPLETION.md` for setup details
3. Check FastAPI documentation
4. Review error messages in terminal

---

## 📄 License

HeritAble - AI Cultural Heritage Guide  
Apache License 2.0

---

**Last Updated**: August 18, 2026  
**Backend Status**: ✅ Running  
**Frontend Status**: ✅ Ready  
**Integration**: ✅ Ready for Phase 1 Step 2
