import React from "react";
import {
  HomeIcon,
  LightBulbIcon,
  ChatIcon,
  DocumentIcon,
  UserGroupIcon,

} from "@heroicons/react/outline";
import { PowerOffIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar_admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    { name: "Overview", icon: <HomeIcon className="h-5 w-5 mr-2" />, path: "/admin_dashboard" },
    { name: "Ideas", icon: <LightBulbIcon className="h-5 w-5 mr-2" />, path: "/admin_idea" },
    { name: "Messages", icon: <ChatIcon className="h-5 w-5 mr-2" />, path: "/admin_messages" },
    { name: "Contracts", icon: <DocumentIcon className="h-5 w-5 mr-2" />, path: "/admin_contract" },
    { name: "Pals", icon: <UserGroupIcon className="h-5 w-5 mr-2" />, path: "/admin_pals" },
  ];

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen p-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-8">foundingpals</h2>
      <ul className="flex-1">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            className={`mb-5 text-xl flex items-center cursor-pointer transition duration-300 px-3 py-2 rounded-md 
              ${
                location.pathname.startsWith(item.path) // Check if path starts with the sidebar item's path
                  ? "text-indigo-600 bg-gray-200 font-semibold"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-200"
              }`}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
      <div
        className="mt-auto flex items-center text-gray-700 hover:text-red-600 hover:bg-gray-200 transition duration-300 cursor-pointer px-3 py-2 rounded-md"
        onClick={handleLogout}
      >
        <PowerOffIcon className="h-5 w-5 mr-2" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar_admin;