import { useEffect, useState } from "react";
import axios from "axios";

const MostSavedRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL=import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios
            .get(`${API_URL}/most-saved-recipes/`) // Update with your actual backend URL
            .then((response) => {
                setRecipes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setError("Failed to load recipes");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen ml-40 p-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Most Saved Recipes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {recipes.map((recipe, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl"
                    >
                        <img 
                            src={recipe.image_url} 
                            alt={recipe.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostSavedRecipes;
