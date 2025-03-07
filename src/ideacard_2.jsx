import React, { useEffect, useState } from "react";
import axios from "axios";

const Idea_Card = ({ props }) => {
  const [comment, setComment] = useState("Loading...");
  const [completionPercent, setCompletionPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const userRole = localStorage.getItem("userRole"); // Get user role from localStorage




  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.put("http://localhost:3000/comment-idea", {
        ideaId: props.id,
        comment,
        completionPercent,
      });

      if (response.status === 200) {
        setSuccess(true);
        setEditMode(false);
      } else {
        console.error("❌ Failed to update idea");
      }
    } catch (error) {
      console.error("❌ Error updating idea:", error);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg overflow-hidden hover:rounded-xl hover:shadow-slate-300 transition-all">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-800">{props.ideaTitle}</h2>
        <span className="text-xs">{props.ideaInfo}</span>

        <div className="mt-4 flex gap-4">
          <p className="text-sm bg-purple-200 p-2 rounded text-purple-600">{props.equity}</p>
          <p className="text-sm text-green-600 bg-green-200 p-2 rounded">{props.ideaType}</p>
        </div>

        {props.acceptedStatus === 1 && (
          <div className="mt-4 border-t pt-4">
            {!editMode ? (
              <>
                {/* Display Mode */}
                <p className="text-sm text-gray-700"><strong>Comment:</strong> {props.comment}</p>
                <p className="text-sm text-gray-700"><strong>Completion:</strong> {props.completion}%</p>

                {userRole === "Talent" && (
  <button
    className="mt-3 w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
    onClick={() => {
      setComment(props.comment || "No comment available");  // Copy props value into state
      setCompletionPercent(props.completion || 0);
      setEditMode(true);
    }}
  >
    Edit
  </button>
)}
              </>
            ) : (
              <>
                {/* Edit Mode */}
                <label className="block text-sm font-medium text-gray-700">Comment:</label>
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mt-2">Completion Percentage:</label>
                <select
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={completionPercent}
                  onChange={(e) => setCompletionPercent(Number(e.target.value))}
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i * 10}>{i * 10}%</option>
                  ))}
                </select>

                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Save"}
                  </button>
                  <button
                    className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-gray-500 transition"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>

                {success && <p className="mt-2 text-green-600 text-sm">✅ Updated successfully!</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Idea_Card;