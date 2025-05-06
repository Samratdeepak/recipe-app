import requests
from config.settings import SPOONACULAR_API_KEY
import requests
from fastapi import HTTPException

def fetch_recipes(ingredients: str):
    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={ingredients}&number=5&apiKey={SPOONACULAR_API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching recipes")
    return response.json()

def fetch_recipe_details(recipe_id: int, user_ingredients: str = ""):
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/information?includeNutrition=true&apiKey={SPOONACULAR_API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching recipe details")

    data = response.json()

    preparation_steps = []
    if "analyzedInstructions" in data and data["analyzedInstructions"]:
        for instruction in data["analyzedInstructions"]:
            for step in instruction.get("steps", []):
                preparation_steps.append(step["step"])

    all_ingredients = [ingredient["name"].lower() for ingredient in data["extendedIngredients"]]
    user_ingredients_list = [ing.strip().lower() for ing in user_ingredients.split(",")] if user_ingredients else []
    missed_ingredients = [ing for ing in all_ingredients if ing not in user_ingredients_list]

    recipe_details = {
        "id": data["id"],
        "title": data["title"],
        "image": data["image"],
        "ingredients": all_ingredients,
        "missedIngredients": missed_ingredients,
        "instructions": preparation_steps if preparation_steps else data.get("instructions", "No instructions available"),
        "nutrition": [{"name": n["name"], "amount": n["amount"]} for n in data["nutrition"]["nutrients"][:5]],
    }

    return recipe_details