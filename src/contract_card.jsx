import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContractCard = ({ contract, onDelete }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName"); // Assuming userName is stored in localStorage

  // State for modal and signature upload
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [signature, setSignature] = useState(null);

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

  const handleSignContract = (contract) => {
    setSelectedContract(contract);
    setShowModal(true);
  };

  const handleFileChange = (event) => {
    setSignature(event.target.files[0]);
  };

  const handleUploadSignature = async () => {
    if (!signature || !selectedContract) {
      alert("Please select a signature file.");
      return;
    }

    const formData = new FormData();
    formData.append("signatureImage", signature);
    formData.append("userName", userName);
    formData.append("userRole", userRole);
    formData.append("agreementId", contract.id);

    try {
      const response = await axios.post("http://localhost:3000/upload-signature", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Signature uploaded successfully!");
        setShowModal(false);
        setSignature(null);
      } else {
        alert("Failed to upload signature.");
      }
    } catch (error) {
      console.error("Error uploading signature:", error);
      alert("Error uploading signature.");
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
            <div className="flex space-x-2">
              <button 
                onClick={() => handleSignContract(contract)} 
                className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                Sign Contract
              </button>
              <button 
                onClick={handleTerminate} 
                className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Terminate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Signature Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Sign Contract</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handleUploadSignature} 
                className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                Upload Signature
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractCard;