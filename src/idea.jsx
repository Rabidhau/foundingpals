import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Idea = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions1, setSelectedOptions1] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [ideaTitle, setIdeaTitle] = useState("");
    const [ideaInfo, setIdeaInfo] = useState("");
    const [ideaType, setIdeaType] = useState("");
    const [ideaStage, setIdeaStage] = useState("");
    const [requirement, setRequirement] = useState("");
    const [error, setError] = useState("");

    const field = ["Tech", "Art", "Business", "Healthcare", "Education", "Other"];
    const idea = ["Idea", "Prototype", "Early Development", "Beta", "Launched"];

    const navigate = useNavigate();

    const handleField = (field) => {
        setSelectedOptions((prev) =>
            prev.includes(field) ? prev.filter((item) => item !== field) : [...prev, field]
        );

        setIdeaType((prev) => {
            const prevArray = prev ? prev.split(", ").filter(Boolean) : [];
            return prevArray.includes(field)
                ? prevArray.filter((item) => item !== field).join(", ")
                : [...prevArray, field].join(", ");
        });
    };

    const handleIdea = (stage) => {
        setSelectedOptions1((prev) =>
            prev.includes(stage) ? prev.filter((item) => item !== stage) : [...prev, stage]
        );

        setIdeaStage((prev) => {
            const prevArray = prev ? prev.split(", ").filter(Boolean) : [];
            return prevArray.includes(stage)
                ? prevArray.filter((item) => item !== stage).join(", ")
                : [...prevArray, stage].join(", ");
        });
    };

    const handleNext = () => {
        if (!ideaTitle.trim() || !ideaInfo.trim() || !ideaType || !ideaStage || !requirement) {
            setError("Please fill in all required fields.");
            toast.error("Please fill in all required fields!", { position: "top-right" });
            return;
        }

        toast.success("Idea created successfully!", { position: "top-right" });

        navigate("/collab-idea", {
            state: { ideaTitle, ideaInfo, ideaType, ideaStage, requirement },
        });
    };

    return (
      <div className="flex bg-gray-50 min-h-screen py-10 px-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-lg shadow-lg p-6 mr-10">
          <ul className="space-y-10 text-gray-600">
            <li>
              <p className="text-indigo-600 text-2xl font-semibold">1. Details</p>
            </li>
            <li>
              <p className="hover:text-indigo-600 text-2xl transition">2. Collaboration Terms</p>
            </li>
          </ul>
        </div>
    
        {/* Main Form */}
        <div className="flex flex-col flex-1 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-indigo-700">Create New Idea</h1>
    
          <div className="grid grid-cols-1 gap-6">
            {/* Idea Title */}
            <div>
              <label htmlFor="idea-title" className="block text-sm font-medium text-gray-700">
                Idea Title
              </label>
              <input
                type="text"
                id="idea-title"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="e.g. AI-based video recruitment and assessment tool"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
              />
            </div>
    
            {/* Idea Info */}
            <div>
              <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">
                Describe your project in a sentence
              </label>
              <textarea
                id="project-description"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="e.g. Improving recruitment efficiency with advanced tools for modern hiring challenges."
                value={ideaInfo}
                onChange={(e) => setIdeaInfo(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-500">*Max 15 words</p>
            </div>
    
            {/* Idea Type Dropdown */}
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700">Type of the Idea</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm p-2 text-left hover:shadow-md"
                >
                  {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select options"}
                </button>
    
                {isOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
                    {field.map((item) => (
                      <label key={item} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(item)}
                          onChange={() => handleField(item)}
                          className="mr-2"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
    
            {/* Idea Stage Dropdown */}
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700">Stage of the Idea</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen1(!isOpen1)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm p-2 text-left hover:shadow-md"
                >
                  {selectedOptions1.length > 0 ? selectedOptions1.join(", ") : "Select stage"}
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
            </div>
    
            {/* Required Expertise Dropdown */}
            <div>
              <label htmlFor="required-expertise" className="block text-sm font-medium text-gray-700">
                Required Expertise
              </label>
              <select
                id="required-expertise"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              >
                <option value="">Select Expertise</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Fullstack dev">Fullstack dev</option>
              </select>
            </div>
    
            {/* Buttons */}
            <div className="flex justify-between mt-10">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-sm font-medium text-white shadow-md hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
    
        {/* Toast Container */}
        <ToastContainer />
      </div>
    );
};


export default Idea;
