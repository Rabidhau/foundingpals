import React, { useEffect, useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import axios from "axios";
import Sidebar from "./assets/sidebar";
import Header from "./assets/header";
import Idea_Card from "./ideacard_2";

const Homepage = () => {
  const [IdeaList, setIdeaList] = useState([]);
  const [showAllIdeas, setShowAllIdeas] = useState(false);
  
  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return; // Ensure userId exists before making a request

    const endpoint = role === "Founder" ? "/get-accepted-Users" : "/get-accepted-Idea";

    axios
      .get(`http://localhost:3000${endpoint}`, { params: { userId } })
      .then((response) => {
        setIdeaList(response?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [role, userId]); // Dependencies ensure it refetches if role/userId changes

  const filteredIdeas = IdeaList.filter((list) => list.acceptedStatus === 1);
  const displayedIdeas = showAllIdeas ? filteredIdeas : filteredIdeas.slice(0, 2);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header />

        {/* Ideas Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Your ideas</h2>
            {filteredIdeas.length > 2 && (
              <button
                onClick={() => setShowAllIdeas(!showAllIdeas)}
                className="text-indigo-600"
              >
                {showAllIdeas ? "Show less" : "View all"}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {displayedIdeas.map((list) => (
              <Idea_Card props={list} key={list.id} />
            ))}
          </div>
        </section>

        {/* Contract Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Your contract</h2>
            <a href="#" className="text-indigo-600">View all</a>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ContractCard />
            <ContractCard />
          </div>
        </section>

        {/* Pals Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Your pals</h2>
            <a href="#" className="text-indigo-600">View all</a>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <PalCard name="Marco Kelly" role="Social Media Manager" />
            <PalCard name="Olly Schroeder" role="DevOps Engineer" />
          </div>
        </section>
      </div>
    </div>
  );
};

const ContractCard = () => (
  <div className="p-4 bg-white rounded shadow border relative items-center">
    <img src="" alt="Contract Preview" className="w-12 h-12 rounded mr-4" />
    <div>
      <h4 className="font-medium text-gray-800 mb-1">Project AI designer contract</h4>
      <p className="text-sm text-gray-500 mb-2">Drafted</p>
      <div className="text-gray-500 text-sm">
        <p>Collaboration Agreement</p>
      </div>
    </div>
    <button className="absolute bottom-4 right-4 text-gray-400 hover:text-gray-600">
      <DotsVerticalIcon className="h-2 w-2" />
    </button>
  </div>
);

const PalCard = ({ name, role }) => (
  <div className="flex items-center p-4 bg-white rounded shadow border">
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
    <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
      Message
    </button>
  </div>
);

export default Homepage;
