import { FaHome, FaUsers, FaChartBar, FaComments, FaSearch, FaBookmark } from "react-icons/fa";

function Sidebar({ userId, selectedOption, setSelectedOption, fetchSavedRecipes }) {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 h-screen fixed left-0 top-0 overflow-y-auto shadow-lg mt-18">
      {/* Dashboard Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {userId === 1 ? "Admin Dashboard" : "User Dashboard"}
      </h2>

      {/* Sidebar Options */}
      <ul className="space-y-4">
        {/* Home */}
        <li
          onClick={() => setSelectedOption("home")}
          className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition ${
            selectedOption === "home" ? "bg-blue-500 text-white" : "hover:bg-gray-700"
          }`}
        >
          <FaHome />
          <span>Home</span>
        </li>

        {userId === 1 ? (
          <>
            {/* Users (Admin Only) */}
            <li
              onClick={() => setSelectedOption("users")}
              className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition ${
                selectedOption === "users" ? "bg-blue-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <FaUsers />
              <span>Users</span>
            </li>

            {/* Most Saved Recipe (Admin Only) */}
            <li
              onClick={() => setSelectedOption("most")}
              className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition ${
                selectedOption === "most" ? "bg-blue-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <FaChartBar />
              <span>Most Saved Recipe</span>
            </li>

            {/* Feedback (Admin Only) */}
            <li
              onClick={() => setSelectedOption("feedback")}
              className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition ${
                selectedOption === "feedback" ? "bg-blue-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <FaComments />
              <span>Feedback</span>
            </li>
          </>
        ) : (
          <>
            {/* Search Recipe (User Only) */}
            <li
              onClick={() => setSelectedOption("recipe")}
              className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition ${
                selectedOption === "recipe" ? "bg-blue-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <FaSearch />
              <span>Search Recipe</span>
            </li>

            {/* Saved Recipes (User Only) */}
            <li
              onClick={() => {
                setSelectedOption("saved");
                fetchSavedRecipes();
              }}
              className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg transition ${
                selectedOption === "saved" ? "bg-blue-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <FaBookmark />
              <span>Saved Recipe</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
