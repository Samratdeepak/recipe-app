import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/popular-recipes/`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-6 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10">
        Popular Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-all duration-300"
            >
              {/* Recipe Image */}
              <div className="relative">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Recipe Details */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {recipe.title}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < Math.round(recipe.average_rating) ? (
                      <FaStar key={i} className="text-yellow-400 text-lg" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-400 text-lg" />
                    )
                  )}
                  <span className="ml-2 text-gray-600 text-sm">
                    {recipe.average_rating} / 5
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No popular recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default PopularRecipes;
