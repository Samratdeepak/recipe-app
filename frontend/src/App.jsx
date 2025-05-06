import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const featureRef = useRef(null);
  const popularRecipesRef = useRef(null);
  const organizationRef = useRef(null);

  return (
    <>
      <Navbar featureRef={featureRef} popularRecipesRef={popularRecipesRef} organizationRef={organizationRef} />
      
      <Routes>
        <Route path="/" element={<Home featureRef={featureRef} popularRecipesRef={popularRecipesRef} organizationRef={organizationRef} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      
          </>
  );
}
export default App;