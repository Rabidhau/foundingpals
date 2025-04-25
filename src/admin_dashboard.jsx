import Header from "./assets/header";
import React, { useEffect, useState } from "react";
import Sidebar_admin from "./assets/admin_sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [UserList, setUserList] = useState([]);
  const [userIdeasMap, setUserIdeasMap] = useState({});
  const [userAgreementsMap, setUserAgreementsMap] = useState({});
  const [acceptedIdeasMap, setAcceptedIdeasMap] = useState({});
  const [rejectedIdeasMap, setRejectedIdeasMap] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Founder");
  const navigate=useNavigate();

  const userId = localStorage.getItem("userId");

  const handleOpenChat = (user) => {
    navigate("/admin_messages", { state: { user } }); // ✅ Correctly passing user
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-All-User", {
        headers: { userId },
      });

      const users = response?.data || [];
      setUserList(users);

      await Promise.all([
        fetchAllUsersIdeas(users),
        fetchAllUsersAgreements(users),
        fetchAllTalentsAcceptedIdeas(users),
      ]);

      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error fetching Users:", error);
      setUserList([]);
      setError("Failed to load Users. Please try again.");
      setLoading(false);
    }
  };

  const fetchAllUsersIdeas = async (users) => {
    try {
      const ideasMap = {};

      await Promise.all(
        users
          .filter((user) => user.role === "Founder")
          .map(async (user) => {
            const response = await axios.get("http://localhost:3000/get-Active-Idea", {
              params: { userId: user.userId },
            });

            ideasMap[user.userId] = response?.data || [];
          })
      );

      setUserIdeasMap(ideasMap);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setUserIdeasMap({});
    }
  };

  const fetchAllUsersAgreements = async (users) => {
    try {
      const agreementsMap = {};

      await Promise.all(
        users
          .filter((user) => user.role === "Founder")
          .map(async (user) => {
            try {
              const response = await axios.get("http://localhost:3000/get-agreement", {
                params: { userName: user.username, userRole: user.role },
              });

              if (response.data.success && response.data.agreements.length > 0) {
                agreementsMap[user.userId] = response.data.agreements;
              }
            } catch (err) {
              console.error(`Error fetching agreements for ${user.username}:`, err);
            }
          })
      );

      setUserAgreementsMap(agreementsMap);
    } catch (error) {
      console.error("Error fetching agreements:", error);
      setUserAgreementsMap({});
    }
  };

  const fetchAllTalentsAcceptedIdeas = async (users) => {
    try {
      const acceptedMap = {};
      const rejectedMap = {};

      await Promise.all(
        users
          .filter((user) => user.role === "Talent")
          .map(async (user) => {
            try {
              const response = await axios.get("http://localhost:3000/get-accepted-Idea", {
                params: { userId: user.userId },
              });

              const acceptedIdeas = response?.data.filter((idea) => idea.acceptedStatus === 1) || [];
              const rejectedIdeas = response?.data.filter((idea) => idea.acceptedStatus === 0) || [];

              acceptedMap[user.userId] = acceptedIdeas;
              rejectedMap[user.userId] = rejectedIdeas;
            } catch (err) {
              console.error(`Error fetching accepted ideas for ${user.username}:`, err);
            }
          })
      );

      setAcceptedIdeasMap(acceptedMap);
      setRejectedIdeasMap(rejectedMap);
    } catch (error) {
      console.error("Error fetching accepted ideas:", error);
      setAcceptedIdeasMap({});
      setRejectedIdeasMap({});
    }
  };

  // Calculate total revenue from contracts
  const calculateTotalRevenue = () => {
    let totalRevenue = 0;
  
    Object.values(userAgreementsMap).forEach((agreements) => {
      totalRevenue += agreements.length * 1000; // Each agreement is ₹1000
    });
  
    console.log("Total Revenue Calculated:", totalRevenue); // Debugging
    return totalRevenue;
  };

  const filteredUsers = UserList.filter((user) => user.role === activeTab);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar_admin />

      <div className="px-4 mt-5 flex flex-col flex-1">
        <Header />

        <div className="p-8 overflow-y-auto">
          {/* Overview Section */}
          <div className="grid grid-cols-3 gap-4 mb-8"> {/* Changed to 3 columns */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-lg">Total Founders</h3>
              <p className="text-4xl font-bold text-white">
                {UserList.filter((user) => user.role === "Founder").length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-lg">Total Talent</h3>
              <p className="text-4xl font-bold text-white">
                {UserList.filter((user) => user.role === "Talent").length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-lg">Total Revenue</h3>
              <p className="text-4xl font-bold text-white">
              Rs.{calculateTotalRevenue().toLocaleString()} {/* Format revenue with commas */}
              </p>
            </div>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex mb-4 border-b">
            {["Founder", "Talent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-semibold border-b-2 transition-all ${
                  activeTab === tab
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:border-gray-700"
                }`}
              >
                {tab === "Founder" ? "All Founders" : "All Talent"}
              </button>
            ))}
          </div>

          {/* Users Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b font-semibold"> 
                  <th className="pb-2">User</th>
                  {activeTab === "Founder" ? (
                    <>
                      <th className="pb-2">Contracts</th>
                      <th className="pb-2">Ideas Posted</th>
                      <th className="pb-2">Message</th>
                    </>
                  ) : (
                    <>
                    <th className="pb-2">Bio</th>
                    <th className="pb-2">Qualification</th>
                      <th className="pb-2">Accepted Ideas</th>
                      <th className="pb-2">Rejected Ideas</th>
                      <th className="pb-2">Message</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-4">
                      Loading users...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center text-red-500 py-4">
                      {error}
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-4">
                      No {activeTab.toLowerCase()}s available
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 flex items-center space-x-3">
                        <img
                          src={user.profile_image ? `http://localhost:3000${user.profile_image}` : "/default-user.png"}
                          alt={user.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700">{user.username}</span>
                      </td>
                      {activeTab === "Founder" ? (
                        <>
                          <td className="px-5">{(userAgreementsMap[user.userId] || []).length}</td>
                          <td className="px-5">{(userIdeasMap[user.userId] || []).length}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-5">{user.bio}</td>
                          <td className="px-5">{user.qualification}</td>
                          <td className="px-5">{(acceptedIdeasMap[user.userId] || []).length}</td>
                          <td className="px-5">{(rejectedIdeasMap[user.userId] || []).length}</td>
                        </>
                      )}
<td className="px-5">
  <button
    onClick={() => handleOpenChat(user)} // ✅ Pass user object to the function
    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
  >
    Message
  </button>
</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;