import React from "react";
import { Pie } from "react-chartjs-2";
import { generatePdf } from "../utils/pdfGenerator";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function RecipeDetails({ selectedRecipe, handleBackToList, handleSaveRecipe }) {
  const downloadRecipePDF = () => {
    generatePdf("recipeDetails", "recipeImage", "recipe_details.pdf");
  };

  const handleSave = () => {
    handleSaveRecipe(selectedRecipe);
  };

  return (
    <div className="bg-white ml-48 p-6 rounded-lg shadow-lg">
      <button onClick={handleBackToList} className="text-blue-500 mb-4">
        ⬅ Back
      </button>

      <h3 className="text-2xl font-bold">{selectedRecipe.title}</h3>

      <img
        id="recipeImage"
        src={selectedRecipe.image}
        alt={selectedRecipe.title}
        className="w-full h-60 object-cover rounded-md my-4"
      />

      <div id="recipeDetails" className="p-4 bg-white rounded-md shadow-md">
        <h3 className="text-2xl font-bold">{selectedRecipe.title}</h3>

        {/* Missing Ingredients */}
        {selectedRecipe.missedIngredients?.length > 0 ? (
          <div className="mt-4">
            <h4 className="text-lg font-bold">Missing Ingredients</h4>
            <ul className="list-disc list-inside text-sm">
              {selectedRecipe.missedIngredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 mt-2">You have all the required ingredients!</p>
        )}

        {/* Preparation Steps */}
        {selectedRecipe.instructions?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-bold">Preparation Steps</h4>
            <ol className="list-decimal list-inside text-sm">
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index} className="mt-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Nutrition Chart */}
        {selectedRecipe.nutrition?.length > 0 ? (
          <>
            <h4 className="text-lg font-bold mt-4">Nutritional Breakdown</h4>
            <div className="w-48 mx-auto">
              <Pie
                data={{
                  labels: selectedRecipe.nutrition.map((item) => item.name),
                  datasets: [
                    {
                      data: selectedRecipe.nutrition.map((item) => item.amount),
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: false }}
                width={300}
                height={300}
              />
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-4">No nutritional data available.</p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
          Save Recipe
        </button>

        <button onClick={downloadRecipePDF} className="bg-blue-500 text-white p-2 rounded">
          Download Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;