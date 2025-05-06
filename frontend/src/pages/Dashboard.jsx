import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UsersList from "../components/UsersList";
import MostSavedRecipes from "../components/MostSavedRecipes";
import FeedbackList from "../components/FeedbackList";
import SavedRecipes from "../components/SavedRecipes";
import RecipeSearch from "../components/RecipeSearch";
import FeedbackForm from "../components/FeedbackForm";

export default function Dashboard() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRecipe, setFeedbackRecipe] = useState(null);
  const [selectedOption, setSelectedOption] = useState("home");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const API_URL=import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    
    if (selectedOption === "saved") {
      fetchSavedRecipes();
    }
  }, [navigate, selectedOption]);

  const handleOpenFeedbackForm = (recipe) => {
    setFeedbackRecipe(recipe);
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = () => {
    setShowFeedbackForm(false);
    setSelectedOption("saved"); // Redirect to saved recipes
  };

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}/saved-recipes/${userId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Saved Recipes:", data);
      setSavedRecipes(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setSavedRecipes([]);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      console.log(`Dashboard: Deleting recipe ${recipeId} for user ${userId}...`);
      
      const response = await fetch(`${API_URL}/saved-recipes/${userId}/${recipeId}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Failed to delete recipe:", errorData);
        throw new Error(`Failed to delete recipe: ${response.status}`);
      }

      console.log(`Recipe ${recipeId} deleted successfully from Dashboard!`);
      
      // Update the saved recipes state
      setSavedRecipes(prevRecipes => 
        prevRecipes.filter(recipe => recipe.recipe_id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        userId={userId}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        fetchSavedRecipes={fetchSavedRecipes}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 mt-12">
        <div className="max-w-6xl mx-auto">
          {selectedOption === "users" && <UsersList />}
          {selectedOption === "most" && <MostSavedRecipes />}
          {selectedOption === "feedback" && <FeedbackList />}
          {selectedOption === "saved" && (
            <SavedRecipes
              userId={userId}
              externalSavedRecipes={savedRecipes}
              externalHandleDelete={handleDeleteRecipe}
              handleOpenFeedbackForm={handleOpenFeedbackForm}
            />
          )}
          {selectedOption === "recipe" && userId !== 1 && (
            <RecipeSearch userId={userId} />
          )}
          {selectedOption === "home" && (
            <div className="bg-white mt-24 ml-72 p-32 rounded-xl shadow-md text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {userId === 1 ? "Admin" : "User"}!
              </h2>
              <p className="text-gray-500 mt-2">Explore {userId === 1 ? "Customers registered with their Feedback and Most Saved Recipe." : "delicious recipes and track your favorites."}!</p>
            </div>
          )}

          {showFeedbackForm && (
            <FeedbackForm
              feedbackRecipe={feedbackRecipe}
              setShowFeedbackForm={setShowFeedbackForm}
              onSubmitSuccess={handleFeedbackSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
