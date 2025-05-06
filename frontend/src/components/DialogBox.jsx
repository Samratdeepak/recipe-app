import React from "react";
import { motion } from "framer-motion";

export default function DialogBox({ title, message, onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/90 p-6 rounded-2xl shadow-xl w-96 text-center backdrop-blur-md border border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>
        
        {children ? (
          children
        ) : (
          <button
            onClick={onClose}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            OK
          </button>
        )}
      </motion.div>
    </div>
  );
}
