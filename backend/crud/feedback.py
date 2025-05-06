from sqlalchemy.orm import Session
from models.recipe_feedback import RecipeFeedback
from schemas.feedback import RecipeFeedbackRequest
from models.recipe_feedback import RecipeFeedback
from models.user import User
from models.favorite_recipe import FavoriteRecipe

def create_feedback(db: Session, feedback: RecipeFeedbackRequest):
    db_feedback = RecipeFeedback(**feedback.dict())
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

def get_feedbacks(db: Session):
    return db.query(RecipeFeedback).all()

def get_feedback_list(db: Session):
    feedbacks = db.query(RecipeFeedback).all()
    feedback_list = []
    for feedback in feedbacks:
        user = db.query(User).filter(User.user_id == feedback.user_id).first()
        recipe = db.query(FavoriteRecipe).filter(FavoriteRecipe.recipe_id == feedback.recipe_id).first()

        if not user or not recipe:
            continue

        feedback_list.append({
            "username": user.username,
            "recipe_name": recipe.title,
            "recipe_image": recipe.image_url,
            "rating": feedback.rating,
            "comment": feedback.comment,
        })

    return feedback_list