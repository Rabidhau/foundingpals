import React, { useState } from "react";
import Sidebar from "./assets/sidebar";
import Subheader from "./assets/subheader";

const Agreement = () => {
  // State for all input fields
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
  const [founderSignature, setFounderSignature] = useState("");
  const [founderDate, setFounderDate] = useState("");
  const [collaboratorSignature, setCollaboratorSignature] = useState("");
  const [collaboratorDate, setCollaboratorDate] = useState("");

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Subheader */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-black mb-10">Contracts</h1>
          <Subheader />
        </div>

        {/* Centered Collaboration Agreement */}
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Agreement</h1>
            <p className="text-gray-600 mb-6">
              This Collaboration Agreement (the "Agreement") is entered into as of{" "}
              <input
                type="text"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                placeholder="Effective Date"
                className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
              />
              , by and between:
            </p>

            {/* Founder & Collaborator Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Founder:</h2>
                <p className="text-gray-600">
                  Name:{" "}
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="Founder’s Full Name"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
                <p className="text-gray-600">
                  Address:{" "}
                  <input
                    type="text"
                    value={founderAddress}
                    onChange={(e) => setFounderAddress(e.target.value)}
                    placeholder="Founder’s Address"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
                <p className="text-gray-600">
                  Email:{" "}
                  <input
                    type="email"
                    value={founderEmail}
                    onChange={(e) => setFounderEmail(e.target.value)}
                    placeholder="Founder’s Email"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">Collaborator:</h2>
                <p className="text-gray-600">
                  Name:{" "}
                  <input
                    type="text"
                    value={collaboratorName}
                    onChange={(e) => setCollaboratorName(e.target.value)}
                    placeholder="Collaborator’s Full Name"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
                <p className="text-gray-600">
                  Address:{" "}
                  <input
                    type="text"
                    value={collaboratorAddress}
                    onChange={(e) => setCollaboratorAddress(e.target.value)}
                    placeholder="Collaborator’s Address"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
                <p className="text-gray-600">
                  Email:{" "}
                  <input
                    type="email"
                    value={collaboratorEmail}
                    onChange={(e) => setCollaboratorEmail(e.target.value)}
                    placeholder="Collaborator’s Email"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-6 space-y-6">
              <Section title="Project Overview">
                <p>
                  <strong>Title:</strong>{" "}
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Project Title"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
                <p>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Brief description of the project, including its objectives and scope"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-purple-600"
                    rows={3}
                  />
                </p>
              </Section>

              <Section title="Roles and Responsibilities">
                <p>
                  <strong>Founder’s Responsibilities:</strong>{" "}
                  <input
                    type="text"
                    value={founderResponsibilities}
                    onChange={(e) => setFounderResponsibilities(e.target.value)}
                    placeholder="Provide guidance, manage direction, etc."
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
                <p>
                  <strong>Collaborator’s Responsibilities:</strong>{" "}
                  <input
                    type="text"
                    value={collaboratorResponsibilities}
                    onChange={(e) => setCollaboratorResponsibilities(e.target.value)}
                    placeholder="Contribute skills, perform tasks, etc."
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
              </Section>

              <Section title="Equity and Compensation">
                <p>
                  <strong>Equity Distribution:</strong> The Collaborator receives{" "}
                  <input
                    type="text"
                    value={equityPercentage}
                    onChange={(e) => setEquityPercentage(e.target.value)}
                    placeholder="Percentage"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                  %.
                </p>
                <p>
                  <strong>Vesting Schedule:</strong>{" "}
                  <input
                    type="text"
                    value={vestingSchedule}
                    onChange={(e) => setVestingSchedule(e.target.value)}
                    placeholder="Details on equity vesting"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />
                </p>
              </Section>

              <Section title="Confidentiality">
                <p>Both parties agree to keep information confidential.</p>
              </Section>

              <Section title="Termination">
                <p>
                  Either party may terminate upon{" "}
                  <input
                    type="text"
                    value={terminationNotice}
                    onChange={(e) => setTerminationNotice(e.target.value)}
                    placeholder="Number of days"
                    className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
                  />{" "}
                  days’ notice.
                </p>
              </Section>
            </div>

            {/* Signatures */}
            <div className="mt-8 border-t pt-6 flex justify-between">
      {/* Founder Section */}
      <div className="text-gray-700">
        <p className="font-semibold">Founder:</p>
        <p>
          Signature:{" "}
          <input
            type="text"
            value={founderSignature}
            onChange={(e) => setFounderSignature(e.target.value)}
            placeholder="Founder’s Signature"
            className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
          />
        </p>
        <p>
          Name:{" "}
          <input
            type="text"
            value={founderName}
            onChange={(e) => setFounderName(e.target.value)}
            placeholder="Founder’s Full Name"
            className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
          />
        </p>
        <p>
          Date:{" "}
          <input
            type="date"
            value={founderDate}
            onChange={(e) => setFounderDate(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
          />
        </p>
      </div>

      {/* Collaborator Section */}
      <div className="text-gray-700">
        <p className="font-semibold">Collaborator:</p>
        <p>
          Signature:{" "}
          <input
            type="text"
            value={collaboratorSignature}
            onChange={(e) => setCollaboratorSignature(e.target.value)}
            placeholder="Collaborator’s Signature"
            className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
          />
        </p>
        <p>
          Name:{" "}
          <input
            type="text"
            value={collaboratorName}
            onChange={(e) => setCollaboratorName(e.target.value)}
            placeholder="Collaborator’s Full Name"
            className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
          />
        </p>
        <p>
          Date:{" "}
          <input
            type="date"
            value={collaboratorDate}
            onChange={(e) => setCollaboratorDate(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-purple-600"
          />
        </p>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <div className="text-gray-600 space-y-2">{children}</div>
  </div>
);

export default Agreement;