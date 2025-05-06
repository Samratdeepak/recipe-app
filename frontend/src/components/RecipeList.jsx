import { Bookmark, Eye } from "lucide-react";

const RecipeList = ({ recipes, handleRecipeClick, handleSaveRecipe }) => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h2>

            {recipes.length === 0 ? (
                <p className="text-gray-500 text-center">No recipes found. Try different ingredients.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.recipe_id}
                            className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
                        >
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>

                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => handleRecipeClick(recipe.recipe_id)}
                                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        <Eye size={18} className="mr-2" />
                                        View
                                    </button>

                                    <button
                                        onClick={() => handleSaveRecipe(recipe.recipe_id)}
                                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        <Bookmark size={18} className="mr-2" />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;
