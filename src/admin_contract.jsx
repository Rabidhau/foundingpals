import React, { useEffect, useState } from "react";
import { Search } from "lucide-react"; 
import axios from "axios";
import Subheader from "./assets/subheader";
import Sidebar_admin from "./assets/admin_sidebar";
import ContractCard from "./contract_card";

const Admin_contract = () => {
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchContracts(); // Fetch contracts on component mount
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchContracts(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchContracts = (query = "") => {
    const url = query.trim()
      ? `http://localhost:3000/get-All-contract?query=${query}`
      : "http://localhost:3000/get-All-contract";

    axios
      .get(url)
      .then((response) => {
        setContracts(response?.data || []);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching contracts:", error);
        setContracts([]); // Clear contracts on error
        setError("Failed to load contracts. Please try again.");
      });
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar_admin />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-black">Explore Contracts</h2>
          <Subheader />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center border-b border-gray-200 px-4">
              <input
                type="text"
                className="w-full py-4 px-6 focus:outline-none"
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="p-2 rounded-sm transition duration-300">
                <Search className="h-6 w-6 text-black opacity-50" />
              </button>
            </div>
          </div>
          <a href="#" className="text-indigo-600">View all</a>
        </div>

        {/* Contracts Section */}
        {contracts.length === 0 ? (
          <p className="text-gray-500 text-center">No contracts available</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_contract;