"""
HeritAble - Museum Artifact Analysis Routes

Endpoints for AI-powered artifact analysis and museum exploration.
"""

from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from typing import Optional
from pydantic import BaseModel
import logging
import base64

from ai.gemini_client import get_gemini_client
from services.firebase_service import get_firebase_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/artifacts", tags=["artifacts"])

# ==================== Data Models ====================

class ArtifactAnalysisRequest(BaseModel):
    """Request for artifact analysis."""
    artifact_name: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    user_id: Optional[str] = None

class ArtifactAnalysisResponse(BaseModel):
    """AI-generated artifact analysis."""
    name: str
    period: str
    origin: str
    materials: Optional[str] = None
    techniques: Optional[str] = None
    cultural_significance: str
    historical_context: str
    interesting_facts: Optional[list] = None
    xp_earned: int = 0

# ==================== Endpoints ====================

@router.post("/analyze")
async def analyze_artifact(request: ArtifactAnalysisRequest) -> ArtifactAnalysisResponse:
    """
    Analyze a cultural artifact using AI vision and knowledge.
    
    Provides:
    - Artifact identification
    - Historical period and dating
    - Origin and provenance
    - Materials and construction techniques
    - Cultural significance
    - Historical context
    - Interesting stories and facts
    
    Args:
        request: Artifact data with optional image URL
    
    Returns:
        Comprehensive artifact analysis
    """
    try:
        if not request.artifact_name and not request.image_url:
            raise HTTPException(
                status_code=400,
                detail="Either artifact_name or image_url is required"
            )
        
        gemini = get_gemini_client()
        
        if not gemini.is_configured():
            return ArtifactAnalysisResponse(
                name=request.artifact_name or "Unknown",
                period="Unknown",
                origin="Unknown",
                cultural_significance="Gemini API not configured",
                historical_context="Please configure GEMINI_API_KEY in .env"
            )
        
        # Analyze artifact
        analysis = await gemini.analyze_artifact(
            request.image_url,
            request.artifact_name
        )
        
        # Award XP for artifact discovery
        xp_earned = 75
        if request.user_id:
            firebase = get_firebase_service()
            await firebase.add_xp(request.user_id, xp_earned, "artifact_analysis")
        
        return ArtifactAnalysisResponse(
            **analysis,
            xp_earned=xp_earned
        )
    
    except Exception as e:
        logger.error(f"Error analyzing artifact: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_artifact(
    file: UploadFile = File(...),
    artifact_name: str = Form(None),
    user_id: str = Form(None),
) -> dict:
    """
    Upload an artifact image for analysis.
    
    Supports: JPG, PNG, WebP formats
    Max size: 10MB
    
    Args:
        file: Image file upload
        artifact_name: Optional artifact name
        user_id: Optional user ID for XP tracking
    
    Returns:
        Analysis results with artifact information
    """
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        allowed_extensions = {".jpg", ".jpeg", ".png", ".webp"}
        file_ext = file.filename.lower().split(".")[-1]
        if f".{file_ext}" not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file format. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read and encode file
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:  # 10MB limit
            raise HTTPException(status_code=413, detail="File too large (max 10MB)")
        
        # Convert to base64
        image_base64 = base64.b64encode(contents).decode("utf-8")
        image_data_url = f"data:image/{file_ext};base64,{image_base64}"
        
        # Analyze artifact
        request = ArtifactAnalysisRequest(
            artifact_name=artifact_name,
            image_url=image_data_url,
            user_id=user_id
        )
        
        return await analyze_artifact(request)
    
    except Exception as e:
        logger.error(f"Error uploading artifact: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{artifact_id}")
async def get_artifact(artifact_id: str) -> dict:
    """
    Get stored artifact information.
    
    Args:
        artifact_id: Artifact ID
    
    Returns:
        Artifact data and analysis
    """
    try:
        firebase = get_firebase_service()
        
        # In future, fetch from Firestore
        # artifact = await firebase.get_artifact(artifact_id)
        
        return {
            "artifact_id": artifact_id,
            "data": {},
            "message": "Integrate Firestore artifact storage here"
        }
    
    except Exception as e:
        logger.error(f"Error getting artifact: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def list_artifacts(
    user_id: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
) -> dict:
    """
    List artifacts (recently analyzed or user's collection).
    
    Args:
        user_id: Optional user ID to get user's artifacts
        limit: Results per page
        offset: Pagination offset
    
    Returns:
        List of artifacts with metadata
    """
    try:
        return {
            "artifacts": [],
            "total": 0,
            "limit": limit,
            "offset": offset,
            "message": "Integrate Firestore artifact listing here"
        }
    
    except Exception as e:
        logger.error(f"Error listing artifacts: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{artifact_id}/save")
async def save_artifact(
    artifact_id: str,
    user_id: str,
    notes: Optional[str] = None,
) -> dict:
    """
    Save artifact to user's collection.
    
    Args:
        artifact_id: Artifact to save
        user_id: User saving the artifact
        notes: Optional user notes
    
    Returns:
        Confirmation of save
    """
    try:
        firebase = get_firebase_service()
        
        # Save to user's collection
        # In future, store in Firestore under user's saved_artifacts
        
        return {
            "artifact_id": artifact_id,
            "user_id": user_id,
            "saved": True,
            "notes": notes,
            "message": "Integrate Firestore save functionality here"
        }
    
    except Exception as e:
        logger.error(f"Error saving artifact: {e}")
        raise HTTPException(status_code=500, detail=str(e))
