import React, { useState, useEffect } from "react";
import DialogBox from "./DialogBox";

function SavedRecipes({ userId, handleOpenFeedbackForm }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [dialogData, setDialogData] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  // Retrieve userId from localStorage if not provided
  const currentUserId = userId || localStorage.getItem("user_id");

  useEffect(() => {
    if (!currentUserId) {
      console.error("User ID is undefined, cannot fetch saved recipes.");
      return;
    }

    fetchSavedRecipes();
  }, [currentUserId]);

  const fetchSavedRecipes = async () => {
    try {
      console.log(`Fetching saved recipes for user: ${currentUserId}`);
      const response = await fetch(`${API_URL}/saved-recipes/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch saved recipes: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched saved recipes:", data);
      setSavedRecipes(data);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!currentUserId || !recipeId) {
      console.error("Invalid userId or recipeId:", { currentUserId, recipeId });
      return;
    }

    setDeleteError(null);
    
    try {
      console.log(`Deleting recipe ${recipeId} for user ${currentUserId}...`);
      
      // Add a URL log to verify the correct endpoint
      const url = `${API_URL}/saved-recipes/${currentUserId}/${recipeId}/`;
      console.log("DELETE request URL:", url);
      
      // Log the token (first few chars for security)
      const token = localStorage.getItem("token");
      console.log("Using token:", token ? `${token.substring(0, 10)}...` : "No token found");

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", response.status);
      
      const responseText = await response.text();
      console.log("Delete response body:", responseText);

      if (!response.ok) {
        throw new Error(`Delete request failed: ${response.status} - ${responseText}`);
      }

      console.log(`Recipe ${recipeId} deleted successfully!`);
      
      // Update UI immediately after successful delete
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.recipe_id !== recipeId)
      );
      
      // Fetch the updated list to confirm changes
      setTimeout(fetchSavedRecipes, 500);
      
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setDeleteError(error.message);
    }
  };

  const confirmDelete = (recipe) => {
    console.log("Confirming delete for recipe:", recipe);
    setDialogData({
      title: "Delete Recipe",
      message: `Are you sure you want to delete "${recipe.title}"?`,
      onConfirm: () => {
        console.log("Delete confirmed for recipe ID:", recipe.recipe_id);
        handleDeleteRecipe(recipe.recipe_id);
        setDialogData(null);
      },
      onClose: () => setDialogData(null),
    });
  };

  return (
    <div className="ml-48 p-8 bg-gray-100 min-h-screen">
      {dialogData && (
        <DialogBox
          title={dialogData.title}
          message={dialogData.message}
          onClose={() => setDialogData(null)}
        >
          <div className="flex space-x-4">
            <button
              onClick={dialogData.onConfirm}
              className="ml-17 mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={() => setDialogData(null)}
              className="mt-4 px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </DialogBox>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Recipes</h2>
      
      {deleteError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error deleting recipe: {deleteError}
        </div>
      )}

      {savedRecipes.length === 0 ? (
        <p className="text-gray-500 text-lg">No saved recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition"
            >
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-3">{recipe.title}</h3>
              <p className="text-sm text-gray-500">ID: {recipe.recipe_id}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => confirmDelete(recipe)}
                >
                  Delete
                </button>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleOpenFeedbackForm && handleOpenFeedbackForm(recipe)}
                >
                  Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;
