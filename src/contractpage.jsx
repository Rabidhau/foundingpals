import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Subheader from "./assets/subheader";
import Sidebar from "./assets/sidebar";

const ContractPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch userRole from localStorage
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);
  }, []);

  // Redirect to create contract page
  const handleCreateContract = () => {
    navigate("/contracts/agreement");
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black mb-10">Contracts</h1>
          <Subheader />
        </div>

        {userRole === "Founder" ? (
          // Founder View (Create Contract UI)
          <div className="mt-40 text-center justify-center">
            <h2 className="text-3xl font-bold text-black mb-4">
              Contracts & Simple E-Signing
            </h2>
            <p className="text-gray-600 mb-6">
              Use standardized contracts or create a completely custom one.
              Enter your payment terms and scope, and send it to be e-signed.
            </p>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              onClick={handleCreateContract}
            >
              Create contract
            </button>
          </div>
        ) : userRole === "Talent" ? (
          // Talent View (Filtered Contracts UI)
          <div>
            {/* Filters Section */}
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search.."
                className="px-4 py-2 border rounded-lg w-1/3"
              />
              <button className="flex items-center px-4 py-2 border rounded-lg">
                <span className="mr-2">Filters</span> ⏷
              </button>
            </div>

            {/* Active Filters */}
            <div className="flex space-x-2 mb-4">
              <span className="px-3 py-1 text-purple-600 border border-purple-300 rounded-full">
                STATUS <strong>Draft</strong> ✕
              </span>
              <span className="px-3 py-1 text-purple-600 border border-purple-300 rounded-full">
                PAL <strong>@marco</strong> ✕
              </span>
              <span className="px-3 py-1 text-purple-600 border border-purple-300 rounded-full">
                IDEA <strong>Project AI</strong> ✕
              </span>
            </div>

            {/* Contracts Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 px-4">Contract title</th>
                  <th className="py-2 px-4">Pals</th>
                  <th className="py-2 px-4">Project</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">...</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">Project AI designer contract</td>
                  <td className="py-3 px-4">Marco Kelly</td>
                  <td className="py-3 px-4">Project AI</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          // Loading or Unauthorized
          <p className="text-gray-500 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ContractPage;