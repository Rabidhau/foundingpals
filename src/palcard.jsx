import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PalCard = ({ props }) => {
  const [isRequestSent, setIsRequestSent] = useState(false); // Track request status

  useEffect(() => {
    const checkFriendRequestStatus = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get logged-in userId
        if (!userId) return;

        const response = await axios.get(`http://localhost:3000/check-friend-status`, {
          params: { userId, friendId: props.userId },
        });

        if (response.data.isRequestSent) {
          setIsRequestSent(true);
        }
      } catch (error) {
        console.error("Error checking friend request status:", error);
      }
    };

    checkFriendRequestStatus();
  }, [props.userId]); // Runs when the component mounts or userId changes

  const handleAddFriend = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("User not logged in.");
        return;
      }

      if (isRequestSent) {
        toast.info("Friend request already sent! ⏳");
        return;
      }

      const response = await axios.post("http://localhost:3000/send-req", {
        userId, // Logged-in user's ID
        friendId: props.userId, // Target user's ID
      });

      if (response.status === 200) {
        setIsRequestSent(true);
        toast.success("Friend request sent successfully! 🎉");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Request already sent. Please wait");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="relative w-20 h-20">
          <img
            src={`http://localhost:3000${props.profile_image}`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <button
          className={`text-white text-sm px-4 py-2 rounded-md transition ${
            isRequestSent ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
          onClick={handleAddFriend}
          disabled={isRequestSent}
        >
          {isRequestSent ? "Request Sent" : "Add Friend"}
        </button>
      </div>

      <div className="mt-3 text-left">
        <h2 className="text-lg font-semibold text-gray-900">@{props.username}</h2>
        <p className="text-sm text-gray-500">{props.role}</p>
        <p className="text-sm text-gray-400">{props.email}</p>
      </div>
    </div>
  );
};

export default PalCard;