import React, { useState } from "react";
import Sidebar from "./assets/sidebar";
import Subheader from "./assets/subheader";
import axios from "axios";
import { toast } from "react-toastify";

const Agreement = () => {
  // State for all input fields
  const [formData, setFormData] = useState({
    effectiveDate: "",
    founderName: localStorage.getItem("userName") || "",
    founderAddress: "",
    founderEmail: localStorage.getItem("userEmail") || "",
    collaboratorName: "",
    collaboratorAddress: "",
    collaboratorEmail: "",
    projectTitle: "",
    projectDescription: "",
    founderResponsibilities: "",
    collaboratorResponsibilities: "",
    equityPercentage: "",
    vestingSchedule: "",
    terminationNotice: "",
    founderSignature: "",
    founderDate: "",
    collaboratorSignature: "",
    collaboratorDate: "",
  });

  // State for friend list popup
  const [friends, setFriends] = useState([]);
  const [showFriendListPopup, setShowFriendListPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const userId = localStorage.getItem("userId");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle numeric input with validation
  const handleNumericInput = (e, max) => {
    const { name, value } = e.target;
    if (value === "" || (Number(value) > 0 && Number(value) <= max)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Fetch friends list
  const getFriends = async () => {
    try {
      if (!userId) {
        console.error("No user ID found in localStorage.");
        return;
      }

      const response = await axios.get("http://localhost:3000/get-friend", {
        params: { userId },
      });

      if (Array.isArray(response.data)) {
        setFriends(response.data);
        setShowFriendListPopup(true);
      } else {
        console.error("Expected an array but got:", typeof response.data);
        setFriends([]);
      }
    } catch (error) {
      console.error("Error getting friends:", error);
      toast.error("Failed to load friends list");
      setFriends([]);
    }
  };

  // Handle sending the agreement
  const handleSend = () => {
    // Validate required fields before proceeding
    if (!formData.projectTitle || !formData.collaboratorName) {
      toast.error("Please fill in required fields (Project Title and Collaborator Name)");
      return;
    }
    getFriends();
  };

  // Handle agreement submission
  const handleSubmit = async (friendId) => {
    const agreementData = {
      userId,
      Id: friendId,
      ...formData
    };
    
    // Store agreement data
    localStorage.setItem("agreementData", JSON.stringify(agreementData));
    
    // Show payment confirmation
    setShowPaymentPopup(true);
    setShowFriendListPopup(false);
  };

  // Handle payment decision
  const handlePaymentDecision = async (decision) => { 
    if (decision === "yes") {
      try {
        const paymentData = {
          total: "1000",
          email: formData.founderEmail,
          name: formData.founderName,
          address: formData.founderAddress,
          title: formData.projectTitle
        };

        const response = await axios.post("http://localhost:3000/payment", paymentData);
        const esewaData = response.data;

        // Redirect to payment
        const paymentUrl = `https://rc-epay.esewa.com.np/api/epay/main/v2/form`;
        const form = document.createElement("form");
        form.method = "POST";
        form.action = paymentUrl;

        Object.keys(esewaData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = esewaData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error("Payment Error:", error);
        toast.error("Failed to initiate payment.");
      }
    }
    setShowPaymentPopup(false);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Subheader */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Contracts</h1>
          <Subheader />
        </div>

        {/* Agreement Form */}
        <div className="flex justify-center">
          <div className="w-full  bg-white rounded-xl shadow-md overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <h1 className="text-3xl font-bold">Collaboration Agreement</h1>
              <p className="mt-2 opacity-90">
                This agreement establishes terms between collaborators working on a joint project
              </p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Effective Date */}
              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  This Collaboration Agreement (the "Agreement") is entered into as of
                </p>
                <div className="relative">
<input
  type="date"
  name="effectiveDate"
  value={formData.effectiveDate}
  onChange={handleInputChange}
  min={new Date().toISOString().split("T")[0]}
  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
/>
                </div>
              </div>

              {/* Parties Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Founder Info */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-700 mb-4">Founder Information</h2>
                  <FormField
                    label="Full Name"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Address"
                    name="founderAddress"
                    value={formData.founderAddress}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Email"
                    name="founderEmail"
                    type="email"
                    value={formData.founderEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Collaborator Info */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-purple-700 mb-4">Collaborator Information</h2>
                  <FormField
                    label="Full Name"
                    name="collaboratorName"
                    value={formData.collaboratorName}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Address"
                    name="collaboratorAddress"
                    value={formData.collaboratorAddress}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Email"
                    name="collaboratorEmail"
                    type="email"
                    value={formData.collaboratorEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Project Overview */}
              <Section title="Project Overview" className="mb-8">
                <FormField
                  label="Project Title"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  required
                />
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Project Description</label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Describe the project objectives, scope, and deliverables"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    rows={4}
                  />
                </div>
              </Section>

              {/* Roles and Responsibilities */}
              <Section title="Roles and Responsibilities" className="mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Founder's Responsibilities</label>
                    <textarea
                      name="founderResponsibilities"
                      value={formData.founderResponsibilities}
                      onChange={handleInputChange}
                      placeholder="List the founder's specific duties and obligations"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Collaborator's Responsibilities</label>
                    <textarea
                      name="collaboratorResponsibilities"
                      value={formData.collaboratorResponsibilities}
                      onChange={handleInputChange}
                      placeholder="List the collaborator's specific duties and obligations"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              </Section>

              {/* Equity and Compensation */}
              <Section title="Equity and Compensation" className="mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Equity Percentage for Collaborator (%)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="equityPercentage"
                        value={formData.equityPercentage}
                        onChange={(e) => handleNumericInput(e, 100)}
                        placeholder="0-100"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <span className="absolute right-3 top-3 text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Vesting Schedule</label>
                    <input
                      type="text"
                      name="vestingSchedule"
                      value={formData.vestingSchedule}
                      onChange={handleInputChange}
                      placeholder="E.g., 4 years with 1-year cliff"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </Section>

              {/* Termination */}
              <Section title="Termination" className="mb-8">
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">Either party may terminate upon</span>
                  <div className="w-20">
                    <input
                      type="text"
                      name="terminationNotice"
                      value={formData.terminationNotice}
                      onChange={(e) => handleNumericInput(e, 365)}
                      className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-purple-600 text-center"
                    />
                  </div>
                  <span className="text-gray-700 ml-2">days' notice</span>
                </div>
              </Section>

              {/* Signatures */}
              <Section title="Signatures" className="mb-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Founder Signature */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-purple-700 mb-4">Founder</h3>
                    <FormField
                      label="Full Name"
                      name="founderName"
                      value={formData.founderName}
                      onChange={handleInputChange}
                    />


                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Date</label>
                      <input
                        type="date"
                        name="founderDate"
                        value={formData.founderDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Collaborator Signature */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-purple-700 mb-4">Collaborator</h3>
                    <FormField
                      label="Full Name"
                      name="collaboratorName"
                      value={formData.collaboratorName}
                      onChange={handleInputChange}
                    />
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Date</label>
                      <input
                        type="date"
                        name="collaboratorDate"
                        value={formData.collaboratorDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </Section>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSend}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                >
                  Send Agreement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friend List Popup */}
      {showFriendListPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Select Collaborator</h2>
              <button
                onClick={() => setShowFriendListPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {Array.isArray(friends) && friends.length > 0 ? (
                <ul className="space-y-3">
                  {friends.map((friend) => (
                    <li key={friend.userId} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <img 
                          src={`http://localhost:3000${friend.profile_image}`} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover mr-3"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/40";
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800">@{friend.username}</p>
                          <p className="text-sm text-gray-500">{friend.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSubmit(friend.userId)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Select
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No friends found</p>
                  <p className="text-sm text-gray-500">Add friends to collaborate with them</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Confirmation Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Payment Required</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>To share this contract, you need to complete a payment of NPR 1000.</p>
                <p className="mt-2">Would you like to proceed to payment?</p>
              </div>
              <div className="mt-5 flex justify-center space-x-4">
                <button
                  onClick={() => handlePaymentDecision("no")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePaymentDecision("yes")}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Form Field Component
const FormField = ({ label, name, type = "text", value, onChange, required = false, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      required={required}
    />
  </div>
);

// Reusable Section Component
const Section = ({ title, children, className = "" }) => (
  <div className={`border-t border-gray-200 pt-6 ${className}`}>
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <span className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </span>
      {title}
    </h2>
    <div className="text-gray-600 space-y-4">{children}</div>
  </div>
);

export default Agreement;