import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox"; // Import dialog component

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dialog, setDialog] = useState({ show: false, title: "", message: "" });
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("username", data.username);

        navigate(data.user_id === 1 ? "/dashboard?admin=true" : "/dashboard");
      } else {
        setDialog({ show: true, title: "Login Failed", message: data.detail });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setDialog({ show: true, title: "Error", message: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Main Login Card */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
        <p className="text-gray-500 text-center text-sm mt-1">Welcome back! Please enter your details.</p>

        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-gray-600 text-sm">Username</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <button className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
            Sign In
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <button onClick={() => navigate("/forgot-password")} className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Sign Up Option */}
        <div className="mt-3 text-center">
          <p className="text-gray-600 text-sm">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-1 text-sm text-blue-500 font-medium hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>

      {/* Dialog Box for Error Messages */}
      {dialog.show && <DialogBox title={dialog.title} message={dialog.message} onClose={() => setDialog({ show: false })} />}
    </div>
  );
}
