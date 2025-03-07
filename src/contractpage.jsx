import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Subheader from "./assets/subheader";
import Sidebar from "./assets/sidebar";

const ContractPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [signature, setSignature] = useState(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole") || "";
    const storedUserName = localStorage.getItem("userName") || "";

    setUserRole(storedUserRole);
    setUserName(storedUserName);

    if (storedUserRole === "Talent" && storedUserName) {
      fetchAgreements(storedUserName, storedUserRole);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAgreements = async (userName, role) => {
    try {
      const response = await axios.get("http://localhost:3000/get-agreement", {
        params: { userName, userRole: role },
      });

      if (response.data.success) {
        setAgreements(response.data.agreements);
      } else {
        setError("Failed to fetch agreements.");
      }
    } catch (err) {
      setError("Error fetching agreements.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContract = () => {
    navigate("/contracts/agreement");
  };

  const handleSignContract = (agreement) => {
    setSelectedAgreement(agreement);
    setShowModal(true);
  };

  const handleFileChange = (event) => {
    setSignature(event.target.files[0]);
  };

  const handleUploadSignature = async () => {
    if (!signature || !selectedAgreement) {
      alert("Please select a signature file.");
      return;
    }

    const formData = new FormData();
    formData.append("signatureImage", signature);
    formData.append("userName", userName);
    formData.append("userRole", userRole);
    formData.append("agreementId", selectedAgreement.id);

    try {
      const response = await axios.post("http://localhost:3000/upload-signature", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Signature uploaded successfully!");
        setShowModal(false);
        setSignature(null);
        fetchAgreements(userName, userRole); // Refresh agreements after signing
      } else {
        alert("Failed to upload signature.");
      }
    } catch (error) {
      console.error("Error uploading signature:", error);
      alert("Error uploading signature.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black mb-10">Contracts</h1>
          <Subheader />
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : userRole === "Founder" ? (
          <div className="mt-40 text-center">
            <h2 className="text-3xl font-bold text-black mb-4">Contracts & Simple E-Signing</h2>
            <p className="text-gray-600 mb-6">
              Use standardized contracts or create a completely custom one. Enter your payment terms and scope, and send it to be e-signed.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg" onClick={handleCreateContract}>
              Create contract
            </button>
          </div>
        ) : userRole === "Talent" ? (
          <div>
            <h2 className="text-2xl font-semibold text-black mb-4">Your Contracts</h2>
            {agreements.length === 0 ? (
              <p className="text-gray-500">No contracts found.</p>
            ) : (
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                <thead>
                  <tr className="text-left text-gray-500 bg-gray-200">
                    <th className="py-2 px-4">Contract Title</th>
                    <th className="py-2 px-4">Collaborator</th>
                    <th className="py-2 px-4">Equity %</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agreements.map((agreement) => {
                    const isPending = !agreement.collaboratorSignature; // ✅ Fixed extra semicolon
                    return (
                      <tr key={agreement.id} className="border-t hover:bg-gray-100">
                        <td className="py-3 px-4">{agreement.projectTitle}</td>
                        <td className="py-3 px-4">{agreement.collaboratorName}</td>
                        <td className="py-3 px-4">{agreement.equityPercentage}%</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full ${isPending ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                            {isPending ? "Pending" : "Complete"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {isPending && (
                            <button className="text-blue-600 hover:underline" onClick={() => handleSignContract(agreement)}>
                              Sign contract
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Unauthorized Access</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Upload Your Signature</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 w-full border border-gray-300 p-2 rounded" />
            <div className="flex justify-end">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg" onClick={handleUploadSignature}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractPage;