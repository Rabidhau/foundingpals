import React, { useEffect, useState } from "react";
import { Search } from "lucide-react"; 
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import JobCard from "./jobcard";
import Sidebar from "./assets/sidebar";
import Header from "./assets/header";
import IdeaCard from "./ideacard";

const Myideas = () => {
  const [IdeaList, setIdeaList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (role === "Founder") {
      fetchIdeas();
    } else if (role === "Talent") {
      fetchAcceptedIdeas();
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (role === "Founder") {
        fetchIdeas(searchQuery);
      } else if (role === "Talent") {
        fetchAcceptedIdeas(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Fetch Active Ideas for Founder
  const fetchIdeas = async (query = "") => {
    try {
      const url = query.trim()
        ? `http://localhost:3000/get-Active-Idea?query=${query}`
        : "http://localhost:3000/get-Active-Idea";

      const response = await axios.get(url, {
        params: { userId },
      });

      setIdeaList(response?.data || []);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setIdeaList([]);
      toast.error("Failed to load ideas. Please try again.");
    }
  };

  // Fetch Accepted Ideas for Talent
  const fetchAcceptedIdeas = async (query = "") => {
    try {
      const url = query.trim()
        ? `http://localhost:3000/get-pending-Idea?query=${query}`
        : "http://localhost:3000/get-pending-Idea";

      const response = await axios.get(url, {
        params: { userId },
      });

      setAcceptedList(response?.data || []);
    } catch (error) {
      console.error("Error fetching accepted ideas:", error);
      setAcceptedList([]);
      toast.error("Failed to load accepted ideas. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Header />

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

        {/* Navigation Tabs */}
        <section className="mt-5">
          <div className="flex items-center mb-4 border-b border-gray-400 pb-2">
            {role === "Founder" ? (
              <>
                <NavLink
                  to="/my-ideas/active"
                  className={({ isActive }) =>
                    `text-3xl font-semibold mx-4 pb-1 ${
                      isActive ? "text-indigo-600 border-b-4 border-indigo-600" : "text-gray-500"
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
                      isActive ? "text-indigo-600 border-b-4 border-indigo-600" : "text-gray-500"
                    }`
                  }
                >
                  Archive Ideas
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/my-ideas/active"
                  className={({ isActive }) =>
                    `text-3xl font-semibold mx-4 pb-1 ${
                      isActive ? "text-indigo-600 border-b-4 border-indigo-600" : "text-gray-500"
                    }`
                  }
                >
                  Applied Ideas
                </NavLink>

                <div className="h-8 w-[2px] bg-gray-400"></div>

                <NavLink
                  to="/accepted-ideas"
                  className={({ isActive }) =>
                    `text-3xl font-semibold mx-4 pb-1 ${
                      isActive ? "text-yellow-600 border-b-4 border-yellow-600" : "text-gray-500"
                    }`
                  }
                >
                  Accepted Ideas
                </NavLink>
                <div className="h-8 w-[2px] bg-gray-400"></div>
                <NavLink
                  to="/rejected-ideas"
                  className={({ isActive }) =>
                    `text-3xl font-semibold mx-4 pb-1 ${
                      isActive ? "text-yellow-600 border-b-4 border-yellow-600" : "text-gray-500"
                    }`
                  }
                >
                  Rejected Ideas
                </NavLink>
              </>
            )}
          </div>

          {/* Display Ideas */}
          <div className="grid grid-cols-3 gap-6">
            {role === "Founder"
              ? IdeaList.map((list) => <JobCard props={list} key={list.id} />)
              : acceptedList
              .filter((list) => list.status != 1&& list.status != 0)
              .map((list) => <IdeaCard props={list} key={list.id} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Myideas;
