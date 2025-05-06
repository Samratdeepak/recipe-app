import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ featureRef, popularRecipesRef, organizationRef }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      {/* Logo + Brand Name */}
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="https://i.ibb.co/5xwm3prd/logo.png"
          alt="Sigmoid Recipe Logo"
          className="h-10"
        />
        <span className="text-2xl font-semibold text-gray-800 tracking-wide">
          Sigmoid Recipe
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
        <Link to="/" className="hover:text-green-500 transition-all">
          Home
        </Link>

        {/* Hide these links when on the dashboard page */}
        {location.pathname !== "/dashboard" && (
          <>
            <button
              onClick={() => scrollToSection(featureRef)}
              className="hover:text-green-500 transition-all"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection(popularRecipesRef)}
              className="hover:text-green-500 transition-all"
            >
              Top Recipe
            </button>
            <button
              onClick={() => scrollToSection(organizationRef)}
              className="hover:text-green-500 transition-all"
            >
              Contact
            </button>
          </>
        )}

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {location.pathname !== "/dashboard" && (
              <Link to="/dashboard" className="hover:text-green-500 transition-all">
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all"
            >
              Logout
            </button>
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <FaUserCircle size={24} className="text-gray-600" />
              <span className="text-gray-700">{username}</span>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
