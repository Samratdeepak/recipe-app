import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox"; // Import DialogBox component

export default function ForgotPassword() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    new_password: "",
    re_new_password: "",
  });
  const [dialog, setDialog] = useState({ show: false, title: "", message: "" });
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.re_new_password) {
      setDialog({ show: true, title: "Error", message: "Passwords do not match!" });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setDialog({
          show: true,
          title: "Success",
          message: "Password reset successful! Redirecting to login...",
        });

        setTimeout(() => navigate("/login"), 2000);
      } else {
        setDialog({ show: true, title: "Error", message: "Password reset failed." });
      }
    } catch (error) {
      setDialog({ show: true, title: "Error", message: "Something went wrong. Try again later." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Card */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        <p className="text-gray-500 text-center text-sm mt-1">Enter your details to reset your password</p>

        <form onSubmit={handleReset} className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={form.new_password}
            onChange={(e) => setForm({ ...form, new_password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Re-enter New Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={form.re_new_password}
            onChange={(e) => setForm({ ...form, re_new_password: e.target.value })}
            required
          />
          <button className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-3 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* Dialog Box for messages */}
      {dialog.show && <DialogBox title={dialog.title} message={dialog.message} onClose={() => setDialog({ show: false })} />}
    </div>
  );
}
