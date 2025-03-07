import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Preview = () => {
  const { id } = useParams(); // Extract ID from URL
  const [agreement, setAgreement] = useState(null); // Store agreement data

  // State for form fields
  const [effectiveDate, setEffectiveDate] = useState("");
  const [founderName, setFounderName] = useState("");
  const [founderAddress, setFounderAddress] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [collaboratorName, setCollaboratorName] = useState("");
  const [collaboratorAddress, setCollaboratorAddress] = useState("");
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [founderResponsibilities, setFounderResponsibilities] = useState("");
  const [collaboratorResponsibilities, setCollaboratorResponsibilities] = useState("");
  const [equityPercentage, setEquityPercentage] = useState("");
  const [vestingSchedule, setVestingSchedule] = useState("");
  const [terminationNotice, setTerminationNotice] = useState("");
  const [founderSignature, setFounderSignature] = useState(null);
  const [collaboratorSignature, setCollaboratorSignature] = useState(null);
  const [founderDate, setFounderDate] = useState("");
  const [collaboratorDate, setCollaboratorDate] = useState("");

  console.log("🔍 Extracted ID from URL:", id); // Debugging log

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/get-detail/${id}`)
        .then((response) => {
          console.log("✅ API Response:", response.data);
          if (response.data.success) {
            const data = response.data.agreement;

            // Populate state variables
            setEffectiveDate(data.effectiveDate || "");
            setFounderName(data.founderName || "");
            setFounderAddress(data.founderAddress || "");
            setFounderEmail(data.founderEmail || "");
            setCollaboratorName(data.collaboratorName || "");
            setCollaboratorAddress(data.collaboratorAddress || "");
            setCollaboratorEmail(data.collaboratorEmail || "");
            setProjectTitle(data.projectTitle || "");
            setProjectDescription(data.projectDescription || "");
            setFounderResponsibilities(data.founderResponsibilities || "");
            setCollaboratorResponsibilities(data.collaboratorResponsibilities || "");
            setEquityPercentage(data.equityPercentage || "");
            setVestingSchedule(data.vestingSchedule || "");
            setTerminationNotice(data.terminationNotice || "");
            setFounderSignature(data.founderSignature || null);
            setCollaboratorSignature(data.collaboratorSignature || null);
            setFounderDate(data.founderDate || "");
            setCollaboratorDate(data.collaboratorDate || "");

            setAgreement(data);
          }
        })
        .catch((error) => {
          console.error("❌ API Error:", error);
        });
    }
  }, [id]);

  if (!agreement) {
    return <p className="text-center text-gray-500">Loading agreement...</p>;
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Centered Collaboration Agreement */}
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Agreement</h1>
          <p className="text-gray-600 mb-6">
            This Collaboration Agreement (the "Agreement") is entered into as of{" "}
            <span className="font-medium text-gray-800">{effectiveDate}</span>, by and between:
          </p>

          {/* Founder & Collaborator Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Founder:</h2>
              <p className="text-gray-600">
                Name: <span className="font-medium text-gray-800">{founderName}</span>
              </p>
              <p className="text-gray-600">
                Address: <span className="font-medium text-gray-800">{founderAddress}</span>
              </p>
              <p className="text-gray-600">
                Email: <span className="font-medium text-gray-800">{founderEmail}</span>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">Collaborator:</h2>
              <p className="text-gray-600">
                Name: <span className="font-medium text-gray-800">{collaboratorName}</span>
              </p>
              <p className="text-gray-600">
                Address: <span className="font-medium text-gray-800">{collaboratorAddress}</span>
              </p>
              <p className="text-gray-600">
                Email: <span className="font-medium text-gray-800">{collaboratorEmail}</span>
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mt-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Project Overview</h2>
              <p>
                <strong>Title:</strong>{" "}
                <span className="font-medium text-gray-800">{projectTitle}</span>
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800">{projectDescription}</p>
              </div>
            </div>

            {/* Roles and Responsibilities */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Roles and Responsibilities</h2>
              <p>
                <strong>Founder's Responsibilities:</strong>{" "}
                <span className="font-medium text-gray-800">{founderResponsibilities}</span>
              </p>
              <p>
                <strong>Collaborator's Responsibilities:</strong>{" "}
                <span className="font-medium text-gray-800">{collaboratorResponsibilities}</span>
              </p>
            </div>

            {/* Equity and Compensation */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Equity and Compensation</h2>
              <p>
                <strong>Equity Distribution:</strong> The Collaborator receives{" "}
                <span className="font-medium text-gray-800">{equityPercentage}%</span>.
              </p>
              <p>
                <strong>Vesting Schedule:</strong>{" "}
                <span className="font-medium text-gray-800">{vestingSchedule}</span>
              </p>
            </div>

            {/* Confidentiality */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Confidentiality</h2>
              <p>Both parties agree to keep information confidential.</p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Termination</h2>
              <p>
                Either party may terminate upon{" "}
                <span className="font-medium text-gray-800">{terminationNotice}</span> days' notice.
              </p>
            </div>

            {/* Signatures Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Signatures</h2>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Founder Signature */}
                <div>
                  <p className="text-gray-700 font-medium mb-2">Founder:</p>
                  <div className="min-h-16 mb-2">
                    {founderSignature && (
                      <img 
                        src={`http://localhost:3000${founderSignature}`}
                        alt="Founder Signature" 
                        className="max-h-16 border-b border-gray-400"
                      />
                    )}
                    {!founderSignature && (
                      <div className="h-16 border-b border-gray-300"></div>
                    )}
                  </div>
                  <p className="text-gray-600">
                    Date: <span className="font-medium text-gray-800">{founderDate}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Name: <span className="font-medium text-gray-800">{founderName}</span>
                  </p>
                </div>
                
                {/* Collaborator Signature */}
                <div>
                  <p className="text-gray-700 font-medium mb-2">Collaborator:</p>
                  <div className="min-h-16 mb-2">
                    {collaboratorSignature && (
                      <img 
                        src={`http://localhost:3000${collaboratorSignature}`}
                        alt="Collaborator Signature" 
                        className="max-h-16 border-b border-gray-400"
                      />
                    )}
                    {!collaboratorSignature && (
                      <div className="h-16 border-b border-gray-300"></div>
                    )}
                  </div>
                  <p className="text-gray-600">
                    Date: <span className="font-medium text-gray-800">{collaboratorDate}</span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Name: <span className="font-medium text-gray-800">{collaboratorName}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;