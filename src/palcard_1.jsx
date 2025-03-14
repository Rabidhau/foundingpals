import React from "react";
import { useNavigate } from "react-router-dom";

const Pal_card = ({ props }) => {
  const navigate = useNavigate();

  const handleOpenChat = () => {
    navigate("/messages", { state: { user: props } }); // Pass user details to Messages.jsx
  };

  return (
    <div className="p-4 bg-white rounded shadow border flex justify-between items-center text-center">
      <div className="flex">
        <img
          src={`http://localhost:3000${props.profile_image}`}
          alt="Friend Profile"
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <div className="flex flex-col mt-2 mx-4">
          <h3 className="font-medium text-gray-800">@{props.username}</h3>
          <h3 className="font-medium text-gray-400">{props.role}</h3>
        </div>
      </div>

      <button
        onClick={handleOpenChat}
        className="mt-2 bg-purple-600 text-white px-4 py-1 rounded-lg"
      >
        Message
      </button>
    </div>
  );
};

export default Pal_card;