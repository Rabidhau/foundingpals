import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/solid";
import axios from "axios";
import { toast } from "react-toastify";

const JobCard = ({ props }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for editing fields
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.ideaTitle);
  const [editedInfo, setEditedInfo] = useState(props.ideaInfo);
  const [editedType, setEditedType] = useState(props.ideaType);
  const [editedStage, setEditedStage] = useState(props.ideaStage);
  const [editedRequirement, setEditedRequirement] = useState(props.requirements);
  const [editedEquity, setEditedEquity] = useState(props.equity);
  const [editedStatus, setEditedStatus] = useState(props.status);

  const field = ["Tech", "Art", "Business", "Healthcare", "Education", "Other"];
  const idea = ["Idea", "Prototype", "Early Development", "Beta", "Launched"];

  const statusColor = props.status == 1 ? "bg-green-500" : "bg-red-500";

const role=localStorage.getItem("userRole")
  const handleClick = () => {
    navigate(`/idea/${props.id}`);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleField = (field) => {
    setSelectedOptions((prev) =>
      prev.includes(field) ? prev.filter((item) => item !== field) : [field] // Allow only one selection at a time
    );
  
    setEditedType((prev) => 
      prev.includes(field) ? "" : field // Reset if deselected, otherwise update
    );
  };
  
  const handleIdea = (stage) => {
    setSelectedOptions1((prev) =>
      prev.includes(stage) ? prev.filter((item) => item !== stage) : [stage]
    );
  
    setEditedStage((prev) =>
      prev.includes(stage) ? "" : stage
    );
  };
  

  const handleSave = async () => {
    if (!props.id) {
      toast.error("Invalid idea ID");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/updateIdea/${props.id}`, {
        ideaTitle: editedTitle,
        ideaInfo: editedInfo,
        ideaType: editedType,
        ideaStage: editedStage,
        requirement: editedRequirement,
        equity: editedEquity,
        status: editedStatus,
      });
      window.location.reload();
      toast.success("Idea updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error updating idea. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg overflow-hidden hover:rounded-xl hover:shadow-slate-300 transition-all">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{props.ideaTitle}</h2>
          {props.status != 1 && role=="Founder" && (
            <PencilIcon
              className="w-5 h-5 text-yellow-500 cursor-pointer hover:text-yellow-600 transition"
              onClick={handleEditClick}
              title="Edit Idea"
            />
          )}
        </div>

        <span className="text-xs">{props.ideaInfo}</span>

        <div className="mt-4 flex gap-4">
          <p className="text-sm bg-purple-200 p-2 rounded text-purple-600">{props.equity}</p>
          <p className="text-sm text-green-600 bg-green-200 p-2 rounded">{props.ideaType}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition duration-300"
            onClick={handleClick}
          >
            Read More
          </button>
          <div className="flex items-center">
            <p className="mr-2">Status:</p>
            <div
              className={`rounded-full w-3 h-3 ${statusColor}`}
              title={props.status == 1 ? "Status: Active" : "Status: Inactive"}
              aria-label={props.status == 1 ? "Status: Active" : "Status: Inactive"}
            ></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Idea</h2>

            <label className="block mb-2">Idea Title</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <label className="block mb-2">Idea Info</label>
            <textarea
              className="w-full border rounded p-2 mb-2"
              value={editedInfo}
              onChange={(e) => setEditedInfo(e.target.value)}
            />

      {/* Label */}
      <label htmlFor="idea-type" className="block text-sm font-medium text-gray-700">
        Type of the idea
      </label>

      {/* Custom Dropdown Button */}
      <div className="relative mb-2" >
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-left"
  >
    {selectedOptions.length > 0 ? selectedOptions.join(", ") : props.ideaType}
  </button>

  {isOpen && (
    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
      {field.map((field) => (
        <label key={field} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedOptions.includes(field)}
            onChange={() => handleField(field)}
            className="mr-2"
          />
          {field}
        </label>
      ))}
    </div>
  )}
</div>




      {/* Label */}
      <label htmlFor="stage-type" className="block text-sm font-medium text-gray-700 mb-2">
        Type of the stage
      </label>

      {/* Custom Dropdown Button */}
      <div className="relative mb-2">
  <button
    type="button"
    onClick={() => setIsOpen1(!isOpen1)}
    className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-left"
  >
    {selectedOptions1.length > 0 ? selectedOptions1.join(", ") : props.ideaStage}
  </button>

  {isOpen1 && (
    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
      {idea.map((stage) => (
        <label key={stage} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedOptions1.includes(stage)}
            onChange={() => handleIdea(stage)}
            className="mr-2"
          />
          {stage}
        </label>
      ))}
    </div>
  )}


    </div>
            <label className="block mb-2">Requirement</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              value={editedRequirement}
              onChange={(e) => setEditedRequirement(e.target.value)}
            />

            <label className="block mb-2">Equity</label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              value={editedEquity}
              onChange={(e) => setEditedEquity(e.target.value)}
            />

            <label className="block mb-2">Status</label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleClose}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
