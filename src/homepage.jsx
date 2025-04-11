import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./assets/sidebar";
import Header from "./assets/header";
import Idea_Card from "./ideacard_2";
import Pal_card from "./palcard_1";
import ContractCard from "./contract_card";

const Homepage = () => {
  const [IdeaList, setIdeaList] = useState([]);
  const [showAllIdeas, setShowAllIdeas] = useState(false);
  const [showAllPals, setShowAllPals] = useState(false);
  const [PalList, setPalList] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [showAllContracts, setShowAllContracts] = useState(false);

  const role = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!userId) return;

    const endpoint = role === "Founder" ? "/get-accepted-Users" : "/get-accepted-Idea";

    axios
      .get(`http://localhost:3000${endpoint}`, { params: { userId } })
      .then((response) => {
        setIdeaList(response?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching ideas:", error);
      });

    axios
      .get(`http://localhost:3000/get-friend`, { params: { userId } })
      .then((response) => {
        setPalList(response?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching pals:", error);
      });

    // Fetch contracts
    if (userName && role) {
      axios
        .get("http://localhost:3000/get-agreement", { 
          params: { userName, userRole: role }
        })
        .then((response) => {
          setContracts(response?.data.agreements || []);
        })
        .catch((error) => {
          console.error("Error fetching contracts:", error);
        });
    }
  }, [role, userId, userName]);

  // Function to remove contract after deletion
  const handleDeleteContract = (contractId) => {
    setContracts(contracts.filter(contract => contract.id !== contractId));
  };

  const filteredIdeas = IdeaList.filter((list) => list.acceptedStatus === 1);
  const displayedIdeas = showAllIdeas ? filteredIdeas : filteredIdeas.slice(0, 2);
  const displayedPals = showAllPals ? PalList : PalList.slice(0, 2);
  const displayedContracts = showAllContracts ? contracts : contracts.slice(0, 2);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
  
      <div className="flex-1 p-6 overflow-y-auto">
        <Header />
  
        <div className="space-y-10">
          {/* Ideas Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Your Ideas</h2>
              {filteredIdeas.length > 2 && (
                <button
                  onClick={() => setShowAllIdeas(!showAllIdeas)}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  {showAllIdeas ? "Show less" : "View all"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedIdeas.map((list) => (
                <Idea_Card props={list} key={list.id} />
              ))}
            </div>
          </section>
  
          {/* Contracts Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Your Contracts</h2>
              {contracts.length > 2 && (
                <button
                  onClick={() => setShowAllContracts(!showAllContracts)}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  {showAllContracts ? "Show less" : "View all"}
                </button>
              )}
            </div>
  
            {contracts.length === 0 ? (
              <div className="text-center mt-10">
                <img src="/no-contracts.svg" alt="No contracts" className="w-40 mx-auto mb-4 opacity-75" />
                <p className="text-gray-500 text-lg">No contracts available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayedContracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} onDelete={handleDeleteContract} />
                ))}
              </div>
            )}
          </section>
  
          {/* Pals Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Your Pals</h2>
              {PalList.length > 2 && (
                <button
                  onClick={() => setShowAllPals(!showAllPals)}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  {showAllPals ? "Show less" : "View all"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedPals.map((pal, index) => (
                <Pal_card key={pal.id || pal.userId || index} props={pal} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Homepage;