"""
HeritAble - Cultural Exploration Routes

Endpoints for cultural discovery, storytelling, and heritage exploration.
"""

from fastapi import APIRouter, HTTPException, Query, Body
from typing import Optional, List
from pydantic import BaseModel
import logging

from ai.gemini_client import get_gemini_client
from services.firebase_service import get_firebase_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/culture", tags=["culture"])

# ==================== Data Models ====================

class CultureQueryRequest(BaseModel):
    """User query about culture or heritage."""
    query: str
    context: Optional[dict] = None
    user_id: Optional[str] = None

class StoryResponse(BaseModel):
    """AI-generated cultural story response."""
    story: str
    sources: Optional[List[str]] = None
    xp_earned: int = 0

class HeritageExploration(BaseModel):
    """Heritage exploration query."""
    topic: str
    location: Optional[str] = None
    category: Optional[str] = None

class FestivalInfo(BaseModel):
    """Information about a cultural festival."""
    name: str
    location: str
    date: str
    description: Optional[str] = None
    traditions: Optional[List[str]] = None

# ==================== Endpoints ====================

@router.post("/story")
async def generate_cultural_story(request: CultureQueryRequest) -> StoryResponse:
    """
    Generate an AI-powered cultural story or explanation.
    
    This endpoint uses Gemini AI to create engaging stories about:
    - Cultural traditions and customs
    - Historical events and heritage sites
    - Festivals and celebrations
    - Ancestral practices and rituals
    
    Args:
        request: Culture query with optional context
    
    Returns:
        Generated story with XP earned
    """
    try:
        if not request.query:
            raise HTTPException(status_code=400, detail="Query is required")
        
        # Get Gemini client
        gemini = get_gemini_client()
        
        if not gemini.is_configured():
            return StoryResponse(
                story="Gemini API is not configured. Please add GEMINI_API_KEY to backend/.env",
                xp_earned=0
            )
        
        # Generate story
        story = await gemini.generate_story(request.query, request.context)
        
        # Award XP to user
        xp_earned = 50
        if request.user_id:
            firebase = get_firebase_service()
            await firebase.add_xp(request.user_id, xp_earned, "story_exploration")
        
        return StoryResponse(
            story=story,
            sources=["Gemini AI", "Cultural Heritage Database"],
            xp_earned=xp_earned
        )
    
    except Exception as e:
        logger.error(f"Error generating cultural story: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/explore")
async def explore_heritage(
    topic: str = Query(..., description="Heritage topic to explore"),
    location: Optional[str] = Query(None, description="Location filter"),
    category: Optional[str] = Query(None, description="Category (festival, tradition, site, etc.)"),
) -> dict:
    """
    Explore cultural heritage with filters.
    
    Supported categories:
    - festival: Cultural celebrations
    - tradition: Customs and practices
    - site: Heritage sites
    - food: Culinary heritage
    - art: Traditional arts and crafts
    - language: Languages and dialects
    
    Args:
        topic: Main topic to explore
        location: Optional location filter
        category: Optional category filter
    
    Returns:
        Matching heritage items with descriptions
    """
    try:
        firebase = get_firebase_service()
        
        # Build query filters
        filters = {"category": category} if category else {}
        if location:
            filters["location"] = location
        
        # For now, return placeholder structure
        # This will integrate with Firebase in next phase
        return {
            "topic": topic,
            "filters": filters,
            "results": [],
            "total": 0,
            "message": "Heritage exploration endpoint - integrate Firestore data here"
        }
    
    except Exception as e:
        logger.error(f"Error exploring heritage: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/festival")
async def get_festival_info(festival: FestivalInfo) -> dict:
    """
    Get detailed information about a cultural festival.
    
    Args:
        festival: Festival information
    
    Returns:
        Comprehensive festival details with history and traditions
    """
    try:
        gemini = get_gemini_client()
        
        if not gemini.is_configured():
            return {
                "name": festival.name,
                "location": festival.location,
                "date": festival.date,
                "description": "Gemini API not configured"
            }
        
        # Generate festival description
        prompt = f"""Provide detailed information about the {festival.name} festival in {festival.location}.
        
Include:
- Historical background and origins
- When and how it's celebrated
- Traditional customs and rituals
- Significance to the culture
- Modern celebrations
- Visitor information"""
        
        description = await gemini.generate_story(prompt)
        
        return {
            "name": festival.name,
            "location": festival.location,
            "date": festival.date,
            "description": description,
            "traditions": festival.traditions or [],
            "ai_generated": True
        }
    
    except Exception as e:
        logger.error(f"Error getting festival info: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
async def search_culture(
    q: str = Query(..., min_length=2, description="Search query"),
    limit: int = Query(10, ge=1, le=50, description="Results limit"),
) -> dict:
    """
    Search cultural heritage content.
    
    Args:
        q: Search query
        limit: Maximum number of results
    
    Returns:
        Search results with relevance scores
    """
    try:
        return {
            "query": q,
            "results": [],
            "total": 0,
            "limit": limit,
            "message": "Search endpoint - integrate full-text search here"
        }
    
    except Exception as e:
        logger.error(f"Error searching culture: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recommendations")
async def get_recommendations(
    user_id: str = Query(..., description="User ID for personalized recommendations"),
    category: Optional[str] = Query(None, description="Category filter"),
) -> dict:
    """
    Get personalized cultural heritage recommendations for user.
    
    Based on:
    - User's exploration history
    - Quiz results and interests
    - XP level and achievements
    - Saved preferences
    
    Args:
        user_id: User ID for personalization
        category: Optional category filter
    
    Returns:
        Personalized recommendations
    """
    try:
        firebase = get_firebase_service()
        user = await firebase.get_user_profile(user_id)
        
        return {
            "user_id": user_id,
            "recommendations": [],
            "personalized": bool(user),
            "message": "Recommendations endpoint - integrate ML model here"
        }
    
    except Exception as e:
        logger.error(f"Error getting recommendations: {e}")
        raise HTTPException(status_code=500, detail=str(e))
