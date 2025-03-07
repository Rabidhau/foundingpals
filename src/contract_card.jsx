import React from "react";
import { useNavigate } from "react-router-dom";

const ContractCard = ({ contract }) => {
  const navigate = useNavigate();
  const userRole=localStorage.getItem("userRole")

  const handlePreview = () => {
    navigate(`/preview/${contract.id}`); // Pass agreement ID
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