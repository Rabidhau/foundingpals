import React, { useEffect,useState } from "react";
import Sidebar from "./assets/sidebar";
import Subheader from "./assets/subheader";
import axios from "axios";
import { toast } from "react-toastify";


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

  // State for signature modal
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [currentSigner, setCurrentSigner] = useState("");

  // State for friend list popup
  const [friends, setFriends] = useState([]);
  const [showFriendListPopup, setShowFriendListPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [formData] = useState({
    total: "1000",
    email: localStorage.getItem("userEmail"),
    name: localStorage.getItem("userName"),
    address: founderAddress,
    title: projectTitle
  });

// Function to fetch friends
const getFriends = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No user ID found in localStorage.");
      return;
    }

    const response = await axios.get("http://localhost:3000/get-friend", {
      params: { userId },
    });

    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) { // Check if response.data is an array
      setFriends(response.data); // Set the array directly
      setShowFriendListPopup(true);
    } else {
      console.error("Expected an array but got:", typeof response.data);
      setFriends([]); // Fallback
    }
  } catch (error) {
    console.error("Error getting friends:", error);
    setFriends([]); // Fallback
  }
};

// Handle sending the agreement
const handleSend = () => {
  getFriends(); // Fetch friends list when clicking "Send Agreement"
};

  // Handle opening the signature modal
  const handleOpenModal = (signer) => {
    setCurrentSigner(signer);
    setShowSignatureModal(true);
  };

  // Handle signature upload
  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (currentSigner === "Founder") {
        setFounderSignature(imageUrl);
      } else {
        setCollaboratorSignature(imageUrl);
      }
      setShowSignatureModal(false);
    }
  };

  const handleSubmit = async () => {
    const agreementData = {
      effectiveDate,
      founderName,
      founderAddress,
      founderEmail,
      collaboratorName,
      collaboratorAddress,
      collaboratorEmail,
      projectTitle,
      projectDescription,
      founderResponsibilities,
      collaboratorResponsibilities,
      equityPercentage,
      vestingSchedule,
      terminationNotice,
      founderSignature,
      founderDate,
      collaboratorSignature,
      collaboratorDate,
    };
  
    // Store agreement data in localStorage
    localStorage.setItem("agreementData", JSON.stringify(agreementData));
  
    // Redirect to payment gateway
    handlePaymentDecision("yes");
  };


  const handleSendToFriend = (friend) => {
    setSelectedFriend(friend);
    setShowPopup(true);
  };
  const handlePaymentDecision = async (decision) => { 
    if (decision === "yes") {
      try {
        const response = await axios.post("http://localhost:3000/payment", formData);
        const esewaData = response.data;
  
        // Redirect user to Esewa payment page with form data
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
    setShowPopup(false);
  };
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
                {founderSignature ? (
                  <img src={founderSignature} alt="Founder Signature" className="h-12" />
                ) : (
                  <button
                    onClick={() => handleOpenModal("Founder")}
                    className="text-purple-600 font-semibold text-xl"
                  >
                    + Add Signature
                  </button>
                )}
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
                {collaboratorSignature ? (
                  <img src={collaboratorSignature} alt="Collaborator Signature" className="h-12" />
                ) : (
                  <button
                    onClick={() => handleOpenModal("Collaborator")}
                    className="text-purple-600 font-semibold text-xl"
                  >
                    + Add Signature
                  </button>
                )}
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

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleSend}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Send Agreement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Sign contract</h2>
            <div className="border-dashed border-2 border-gray-300 p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="hidden"
                id="signature-upload"
              />
              <label htmlFor="signature-upload" className="cursor-pointer text-purple-600">
                Click to upload
              </label>
            </div>
            <button
              onClick={() => setShowSignatureModal(false)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg"
            >
              Confirm Signature
            </button>
          </div>
        </div>
      )}

      {/* Friend List Popup */}
      {showFriendListPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Send Agreement To</h2>
            <div className="space-y-2">
            {Array.isArray(friends) && friends.length > 0 ? (
  friends.map((friend) => (
    <div key={friend.userId} className="flex  justify-between items-center p-2 border border-gray-200 rounded-lg">
      <div className="flex"><img 
  src={`http://localhost:3000${friend.profile_image}`} 
  alt="Friend Profile" 
  className="w-10 h-10 rounded-full object-cover"
/>
      <span className="mt-1 mx-4">@{friend.username}</span></div>
      <button
        onClick={() => handleSendToFriend(friend.email)}
        className="bg-purple-600 text-white px-4 py-1 rounded-lg"
      >
        Send
      </button>
    </div>
  ))
) : (
  <p className="text-gray-600 text-center">No friends found.</p>
)}
            </div>
            <button
              onClick={() => setShowFriendListPopup(false)}
              className="mt-4 w-full bg-gray-300 text-black py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
            {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">
              To share a contract, you need to make a payment first.
            </h3>
            <p className="text-center text-gray-600 mb-4">
              Would you like to continue with the payment?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSubmit()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => handlePaymentDecision("no")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
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