import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Preview = () => {
  const { id } = useParams();
  const [agreement, setAgreement] = useState(null);

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

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/get-detail/${id}`)
        .then((response) => {
          if (response.data.success) {
            const data = response.data.agreement;

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
        .catch((error) => console.error("API Error:", error));
    }
  }, [id]);

  if (!agreement) {
    return <p className="text-center text-gray-500 mt-20">Loading agreement...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Collaboration Agreement</h1>

        <p className="text-gray-700 mb-8 text-center text-lg">
          This Collaboration Agreement (the "Agreement") is entered into as of <span className="font-semibold text-gray-900">{effectiveDate}</span>, by and between:
        </p>

        {/* Parties Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Founder</h2>
            <p><strong>Name:</strong> {founderName}</p>
            <p><strong>Address:</strong> {founderAddress}</p>
            <p><strong>Email:</strong> {founderEmail}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Collaborator</h2>
            <p><strong>Name:</strong> {collaboratorName}</p>
            <p><strong>Address:</strong> {collaboratorAddress}</p>
            <p><strong>Email:</strong> {collaboratorEmail}</p>
          </div>
        </div>

        {/* Agreement Sections */}
        <div className="space-y-10">
          {/* Project Overview */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-1 mb-3">Project Overview</h2>
            <p><strong>Title:</strong> {projectTitle}</p>
            <p className="mt-2 text-gray-700 bg-gray-100 p-4 rounded-lg">{projectDescription}</p>
          </section>

          {/* Responsibilities */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-1 mb-3">Roles & Responsibilities</h2>
            <p><strong>Founder:</strong> {founderResponsibilities}</p>
            <p><strong>Collaborator:</strong> {collaboratorResponsibilities}</p>
          </section>

          {/* Equity and Compensation */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-1 mb-3">Equity & Compensation</h2>
            <p><strong>Equity Distribution:</strong> Collaborator receives {equityPercentage}%</p>
            <p><strong>Vesting Schedule:</strong> {vestingSchedule}</p>
          </section>

          {/* Confidentiality */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-1 mb-3">Confidentiality</h2>
            <p>Both parties agree to keep information confidential.</p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-1 mb-3">Termination</h2>
            <p>Either party may terminate upon {terminationNotice} days' notice.</p>
          </section>

          {/* Signatures */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Signatures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Founder Signature */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-2">Founder</h3>
                {founderSignature ? (
                  <img src={`http://localhost:3000${founderSignature}`} alt="Founder Signature" className="h-16 mb-2 border-b" />
                ) : (
                  <div className="h-16 mb-2 border-b border-gray-300"></div>
                )}
                <p><strong>Date:</strong> {founderDate}</p>
                <p><strong>Name:</strong> {founderName}</p>
              </div>

              {/* Collaborator Signature */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-gray-800 font-semibold mb-2">Collaborator</h3>
                {collaboratorSignature ? (
                  <img src={`http://localhost:3000${collaboratorSignature}`} alt="Collaborator Signature" className="h-16 mb-2 border-b" />
                ) : (
                  <div className="h-16 mb-2 border-b border-gray-300"></div>
                )}
                <p><strong>Date:</strong> {collaboratorDate}</p>
                <p><strong>Name:</strong> {collaboratorName}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Preview;