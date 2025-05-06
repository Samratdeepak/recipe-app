from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.feedback import RecipeFeedbackRequest, FeedbackResponse
from crud.feedback import create_feedback, get_feedbacks
from dependencies.database import get_db
from crud.feedback import get_feedback_list
from dependencies.database import get_db
from typing import List

router = APIRouter()

@router.post("/recipe-feedback/")
def submit_recipe_feedback(request: RecipeFeedbackRequest, db: Session = Depends(get_db)):
    feedback = create_feedback(db, request)
    return {"message": "Feedback submitted successfully"}


@router.get("/feedback-list/", response_model=List[FeedbackResponse])
def get_feedback_list_endpoint(db: Session = Depends(get_db)):
    feedbacks = get_feedback_list(db)
    if not feedbacks:
        raise HTTPException(status_code=404, detail="No feedback found")
    return feedbacks