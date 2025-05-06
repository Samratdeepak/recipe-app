from sqlalchemy.orm import Session
from models.favorite_recipe import FavoriteRecipe
from schemas.recipe import FavoriteRecipeRequest
from sqlalchemy import func
from models.favorite_recipe import FavoriteRecipe
from models.recipe_feedback import RecipeFeedback

def create_favorite_recipe(db: Session, recipe: FavoriteRecipeRequest):
    db_recipe = FavoriteRecipe(**recipe.dict())
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def get_favorite_recipes(db: Session, user_id: int):
    return db.query(FavoriteRecipe).filter(FavoriteRecipe.user_id == user_id).all()

def delete_favorite_recipe(db: Session, user_id: int, recipe_id: int):
    recipe = db.query(FavoriteRecipe).filter(FavoriteRecipe.user_id == user_id, FavoriteRecipe.recipe_id == recipe_id).first()
    if recipe:
        db.delete(recipe)
        db.commit()
    return recipe

def get_most_saved_recipes(db: Session):
    return (
        db.query(FavoriteRecipe.title, FavoriteRecipe.image_url, func.count(FavoriteRecipe.recipe_id).label("save_count"))
        .group_by(FavoriteRecipe.recipe_id, FavoriteRecipe.title, FavoriteRecipe.image_url)
        .order_by(func.count(FavoriteRecipe.recipe_id).desc())
        .all()
    )

def get_popular_recipes(db: Session):
    return (
        db.query(
            RecipeFeedback.recipe_id,
            func.avg(RecipeFeedback.rating).label("average_rating"),
            FavoriteRecipe.title,
            FavoriteRecipe.image_url
        )
        .join(FavoriteRecipe, RecipeFeedback.recipe_id == FavoriteRecipe.recipe_id)
        .group_by(RecipeFeedback.recipe_id, FavoriteRecipe.title, FavoriteRecipe.image_url)
        .having(func.avg(RecipeFeedback.rating) >= 4)
        .all()
    )