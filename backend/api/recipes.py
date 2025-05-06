from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.recipe import RecipeSearchRequest, FavoriteRecipeRequest
from crud.recipe import create_favorite_recipe, get_favorite_recipes, delete_favorite_recipe
from dependencies.database import get_db
from utils.spoonacular import fetch_recipes, fetch_recipe_details
from sqlalchemy import func
from models.favorite_recipe import FavoriteRecipe
from models.recipe_feedback import RecipeFeedback
from dependencies.database import get_db
from typing import List

router = APIRouter()

@router.post("/recipes/")
def get_recipes(request: RecipeSearchRequest):
    recipes = fetch_recipes(request.ingredients)
    return recipes

@router.get("/recipe/{recipe_id}/")
def get_recipe_details(recipe_id: int, user_ingredients: str = ""):
    recipe_details = fetch_recipe_details(recipe_id, user_ingredients)
    return recipe_details

@router.post("/save-recipe/")
def save_recipe(request: FavoriteRecipeRequest, db: Session = Depends(get_db)):
    recipe = create_favorite_recipe(db, request)
    return {"message": "Recipe saved successfully"}

@router.get("/saved-recipes/{user_id}/")
def get_saved_recipes(user_id: int, db: Session = Depends(get_db)):
    recipes = get_favorite_recipes(db, user_id)
    return recipes

@router.delete("/saved-recipes/{user_id}/{recipe_id}/")
def delete_saved_recipe(user_id: int, recipe_id: int, db: Session = Depends(get_db)):
    recipe = delete_favorite_recipe(db, user_id, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return {"message": "Recipe deleted successfully"}

@router.get("/most-saved-recipes/", response_model=List[dict])
def get_most_saved_recipes(db: Session = Depends(get_db)):
    recipes = (
        db.query(FavoriteRecipe.title, FavoriteRecipe.image_url, func.count(FavoriteRecipe.recipe_id).label("save_count"))
        .group_by(FavoriteRecipe.recipe_id, FavoriteRecipe.title, FavoriteRecipe.image_url)
        .order_by(func.count(FavoriteRecipe.recipe_id).desc())
        .all()
    )

    return [{"title": recipe.title, "image_url": recipe.image_url} for recipe in recipes]

@router.get("/popular-recipes/", response_model=List[dict])
def get_popular_recipes(db: Session = Depends(get_db)):
    popular_recipes = (
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

    return [
        {
            "recipe_id": recipe.recipe_id,
            "title": recipe.title,
            "image_url": recipe.image_url,
            "average_rating": round(recipe.average_rating, 1)  # Round to 1 decimal
        }
        for recipe in popular_recipes
    ]