import React from "react";
import { useNavigate } from "react-router-dom";

const ContractCard = ({ contract, onDelete }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handlePreview = () => {
    navigate(`/preview/${contract.id}`); // Navigate to preview page
  };

  const handleTerminate = async () => {
    if (!window.confirm("Are you sure you want to terminate this contract?")) return;

    try {
      const response = await fetch(`http://localhost:3000/contracts/${contract.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Contract terminated successfully.");
        onDelete(contract.id); // Remove contract from UI
      } else {
        alert("Failed to terminate contract.");
      }
    } catch (error) {
      console.error("Error deleting contract:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all">
      {/* Contract Image */}
      <img src="/images.png" alt="Contract" className="w-70 h-40 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{contract.projectTitle}</h2>
        <h2 className="text-lg font-light text-gray-400">{contract.projectDescription}</h2>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button 
            onClick={handlePreview} 
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Preview
          </button>
          {userRole === "Founder" && (
            <button 
              onClick={handleTerminate} 
              className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Terminate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractCard;