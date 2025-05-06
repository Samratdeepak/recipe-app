import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox"; // Import dialog component

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
  });

  const [dialog, setDialog] = useState({ show: false, title: "", message: "" });
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.re_password) {
      setDialog({ show: true, title: "Error", message: "Passwords do not match!" });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setDialog({ show: true, title: "Success", message: "Signup successful! Redirecting to login..." });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setDialog({ show: true, title: "Signup Failed", message: data.detail || "User already exists." });
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setDialog({ show: true, title: "Error", message: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Compact Signup Card */}
      <div className="w-full max-w-xs bg-white shadow-md rounded-lg p-4 mt-20">
        <h2 className="text-xl font-semibold text-center text-gray-800">Create an Account</h2>
        <p className="text-gray-500 text-center text-xs mt-1">Join us and explore new recipes.</p>

        <form onSubmit={handleSignup} className="mt-4 space-y-3">
          {/* Username */}
          <div>
            <label className="block text-gray-600 text-xs">Username</label>
            <input
              type="text"
              className="w-full p-1.5 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-xs">Email</label>
            <input
              type="email"
              className="w-full p-1.5 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 text-xs">Phone</label>
            <input
              type="text"
              className="w-full p-1.5 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-xs">Password</label>
            <input
              type="password"
              className="w-full p-1.5 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 text-xs">Confirm Password</label>
            <input
              type="password"
              className="w-full p-1.5 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-xs"
              onChange={(e) => setForm({ ...form, re_password: e.target.value })}
              required
            />
          </div>

          {/* Signup Button */}
          <button className="w-full py-1.5 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-all">
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-3 text-center">
          <p className="text-gray-600 text-xs">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-1 text-xs text-blue-500 font-medium hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Dialog Box for Messages */}
      {dialog.show && <DialogBox title={dialog.title} message={dialog.message} onClose={() => setDialog({ show: false })} />}
    </div>
  );
}
