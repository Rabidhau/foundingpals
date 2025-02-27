import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Subheader from "./assets/subheader";
import Sidebar from "./assets/sidebar";


const ContractPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle button click
  const handleCreateContract = () => {
    navigate("/contracts/agreement"); // Redirect to the agreement page
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black mb-10">Contracts</h1>
          <Subheader />
        </div>

        {/* Main Content */}
        <div className="mt-40 text-center justify-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Contracts & Simple E-Signing
          </h2>
          <p className="text-gray-600 mb-6">
            Use standardized contracts or create a completely custom one. Enter
            your payment terms and scope, and send it to be e-signed.
          </p>

          {/* Button */}
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={handleCreateContract} // Add onClick handler
          >
            Create contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;