import { useState } from "react";
import RecipeDetails from "./RecipeDetails";
import DialogBox from "./DialogBox";

function RecipeSearch({ userId }) {
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [dialogData, setDialogData] = useState(null);
    const API_URL=import.meta.env.VITE_BACKEND_URL;

    const handleSearchRecipes = async () => {
        const response = await fetch(`${API_URL}/recipes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ingredients }),
        });

        const data = await response.json();
        setRecipes(data);
    };

    const handleRecipeClick = async (recipeId) => {
        try {
            const response = await fetch(
                `${API_URL}/recipe/${recipeId}/?user_ingredients=${encodeURIComponent(ingredients)}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            const data = await response.json();
            setSelectedRecipe({
                ...data,
                missedIngredients: data.missedIngredients || [],
            });
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    };

    const handleBackToList = () => {
        setSelectedRecipe(null);
    };

    const handleSaveRecipe = async (recipe) => {
        const userId = parseInt(localStorage.getItem("user_id"), 10);

        if (!userId) {
            setDialogData({
                title: "Error",
                message: "User ID is missing. Please log in.",
                onClose: () => setDialogData(null)
            });
            return;
        }

        const requestData = {
            user_id: userId,
            recipe_id: recipe.id,
            title: recipe.title,
            image_url: recipe.image,
            ingredients: JSON.stringify(recipe.ingredients),
            nutrition: JSON.stringify(recipe.nutrition),
        };

        try {
            const response = await fetch(`${API_URL}/save-recipe/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.detail || "Failed to save recipe.");
            }

            setDialogData({
                title: "Success",
                message: "Recipe saved successfully!",
                onClose: () => setDialogData(null)
            });
        } catch (error) {
            setDialogData({
                title: "Error",
                message: error.message,
                onClose: () => setDialogData(null)
            });
        }
    };

    return (
        <div className="bg-gray-100 ml-32 min-h-screen w-11/12 p-6">
            {dialogData && (
                <DialogBox
                    title={dialogData.title}
                    message={dialogData.message}
                    onClose={dialogData.onClose}
                />
            )}
            
            {selectedRecipe ? (
                <RecipeDetails
                    selectedRecipe={selectedRecipe}
                    handleBackToList={handleBackToList}
                    handleSaveRecipe={handleSaveRecipe}
                />
            ) : (
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">Find a Recipe</h3>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Enter ingredients (comma-separated)..."
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleSearchRecipes}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg transition"
                        >
                            Search
                        </button>
                    </div>

                    {recipes.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                            {recipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    onClick={() => handleRecipeClick(recipe.id)}
                                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition"
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                    <h4 className="font-semibold text-gray-800 mt-2 text-center">{recipe.title}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RecipeSearch;
