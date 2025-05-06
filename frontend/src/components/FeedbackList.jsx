import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const API_URL=import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios
            .get(`${API_URL}/feedback-list/`)
            .then((response) => setFeedbacks(response.data))
            .catch((error) => console.error("Error fetching feedback:", error));
    }, []);

    return (
        <div className="bg-gray-50 ml-40 min-h-screen py-10 px-10 lg:px-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">User Feedback</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks.map((feedback, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Recipe Image */}
                        <img
                            src={feedback.recipe_image}
                            alt={feedback.recipe_name}
                            className="w-full h-48 object-cover"
                        />

                        {/* Feedback Content */}
                        <div className="p-5">
                            {/* Recipe Name */}
                            <h3 className="text-xl font-semibold text-gray-900">{feedback.recipe_name}</h3>
                            
                            {/* Username */}
                            <p className="text-gray-500 text-sm mt-1">By: <span className="font-medium">{feedback.username}</span></p>

                            {/* Star Rating */}
                            <div className="flex items-center mt-2">
                                {[...Array(feedback.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-lg">★</span>
                                ))}
                                {[...Array(5 - feedback.rating)].map((_, i) => (
                                    <span key={i} className="text-gray-300 text-lg">★</span>
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 italic mt-3">"{feedback.comment}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;
