import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const API_URL=import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        console.error("Error fetching users:", data.detail);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="ml-40 p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Users List
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex items-center transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-blue-500 text-white p-4 rounded-full">
              <FaUser className="text-3xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {user.username}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
