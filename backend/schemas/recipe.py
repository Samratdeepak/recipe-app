from pydantic import BaseModel

class RecipeSearchRequest(BaseModel):
    ingredients: str

class FavoriteRecipeRequest(BaseModel):
    user_id: int
    recipe_id: int
    title: str
    image_url: str
    ingredients: str  # JSON string
    nutrition: str  # JSON string