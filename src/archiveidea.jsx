import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobCard from "./jobcard";
import Sidebar from "./assets/sidebar";
import { NavLink } from "react-router-dom";
import Subheader from "./assets/subheader";

const Archive = () => {
  const [ideaList, setIdeaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    fetchIdeas(); // Fetch initially
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchIdeas(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchIdeas = async (query = "") => {
    try {
      const url = query
        ? `http://localhost:3000/get-Archive-Idea?query=${query}`
        : "http://localhost:3000/get-Archive-Idea";

      const response = await axios.get(url, {
        params: role === "Founder" && userId ? { userId } : undefined,
      });

      setIdeaList(response?.data || []);
    } catch (error) { 
      console.error("Error fetching ideas:", error);
      setIdeaList([]);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Subheader />

        {/* Search Bar */}
        <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center border-b border-gray-200 px-4">
            <input
              type="text"
              className="w-full py-4 px-6 focus:outline-none"
              placeholder="Enter the idea title, idea type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="p-2 rounded-sm transition duration-300">
              <Search className="h-6 w-6 text-black opacity-50" />
            </button>
          </div>
        </div>

        {/* Ideas Section with Tabs */}
        <section className="mt-5">
          <div className="flex items-center mb-4 border-b border-gray-400 pb-2">
            <NavLink
              to="/my-ideas/active"
              className={({ isActive }) =>
                `text-3xl font-semibold mx-4 pb-1 ${
                  isActive
                    ? "text-indigo-600 border-b-4 border-indigo-600"
                    : "text-gray-500"
                }`
              }
            >
              Active Ideas
            </NavLink>

            <div className="h-8 w-[2px] bg-gray-400"></div>

            <NavLink
              to="/my-ideas/archive"
              className={({ isActive }) =>
                `text-3xl font-semibold mx-4 pb-1 ${
                  isActive
                    ? "text-indigo-600 border-b-4 border-indigo-600"
                    : "text-gray-500"
                }`
              }
            >
              Archive Ideas
            </NavLink>
          </div>

          {ideaList.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-10">
              No archived ideas found.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {ideaList.map((idea) => (
                <JobCard key={idea.id} props={idea} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Archive;