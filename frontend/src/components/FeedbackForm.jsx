import { useState } from "react";
import { motion } from "framer-motion";
import DialogBox from "./DialogBox";
import { Star } from "lucide-react";

function FeedbackForm({ feedbackRecipe, setShowFeedbackForm, onSubmitSuccess }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [dialog, setDialog] = useState(null);
  const userId = Number(localStorage.getItem("user_id"));
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  const handleSubmitFeedback = async () => {
    if (rating === 0 || comment.trim() === "") {
      setDialog({ title: "Error", message: "Please provide a rating and a comment." });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/recipe-feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: userId,
          recipe_id: feedbackRecipe.recipe_id,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to submit feedback");
      }

      setDialog({ title: "Success", message: "Feedback submitted successfully!" });

      // Close form after success
      setTimeout(() => {
        setDialog(null);
        setShowFeedbackForm(false);
        onSubmitSuccess();
      }, 2000);
    } catch (error) {
      setDialog({ title: "Error", message: error.message });
    }
  };

  return (
    <>
      {/* Feedback Form */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center backdrop-blur-md border border-gray-300"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            Feedback for {feedbackRecipe.title}
          </h3>

          {/* Star Rating */}
          <div className="flex justify-center mt-4 space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer w-8 h-8 transition ${
                  star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* Comment Input */}
          <textarea
            className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              onClick={() => setShowFeedbackForm(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={handleSubmitFeedback}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Dialog Box */}
      {dialog && <DialogBox title={dialog.title} message={dialog.message} onClose={() => setDialog(null)} />}
    </>
  );
}

export default FeedbackForm;
