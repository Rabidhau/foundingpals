import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Collab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};
  const [error, setError] = useState("");
  const [equity, setEquity] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEquity = () => {
    const percentage = parseFloat(equity);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      setError("Equity must be a valid percentage between 0 and 100.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEquity()) return;
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      await axios.post("http://localhost:3000/create-idea", {
        userId,
        ...formData,
        equity,
        status: true,
      });

      toast.success("Project activated successfully!");
      navigate("/my-ideas/active");
    } catch (error) {
      toast.error("Error activating project. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("http://localhost:3000/create-idea", {
        userId,
        ...formData,
        equity,
        status: false,
      });

      toast.success("Project archived successfully.");
      navigate("/home");
    } catch (error) {
      toast.error("Error archiving project. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-white h-screen  rounded-lg shadow-lg overflow-auto p-8">
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

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Collaboration Terms</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          This Collaboration Terms Agreement ("Agreement") is made on this day between the Initiator and any potential Collaborator(s) interested in contributing to the project.
        </p>

        <div className="space-y-10 text-gray-800 text-[15px]">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Project Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Project Overview</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Title:</strong> {formData.ideaTitle}</li>
              <li><strong>Description:</strong> {formData.ideaInfo}</li>
              <li><strong>Type:</strong> {formData.ideaType}</li>
              <li><strong>Stage:</strong> {formData.ideaStage}</li>
            </ul>
          </section>

          {/* Roles & Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Roles & Responsibilities</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Expertise Needed:</strong> {formData.requirement}</li>
              <li>Collaborators actively contribute to development and execution.</li>
              <li>Responsibilities should be completed within agreed timelines.</li>
            </ul>
          </section>

          {/* Equity Distribution */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Equity Distribution & Ownership</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Equity Share:</strong>
                <input
                  type="text"
                  value={equity}
                  onChange={(e) => setEquity(e.target.value)}
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 w-24 focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 10"
                />%
              </li>
              <li>Ownership is based on contributions.</li>
              <li>Equity structure changes must be agreed upon.</li>
            </ul>
          </section>

          {/* Confidentiality */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Confidentiality & Intellectual Property</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>All project-related information remains confidential.</li>
              <li>IP will be jointly owned unless otherwise stated.</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold mb-3 border-b pb-1">Dispute Resolution</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Conflicts will be resolved through discussions or third-party mediation.</li>
            </ul>
          </section>

          {/* Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <button
              onClick={handleArchive}
              disabled={loading}
              className="rounded-md bg-gray-600 text-white px-6 py-2 text-sm hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? "Archiving..." : "Archive"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-md bg-indigo-600 text-white px-6 py-2 text-sm hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Activating..." : "Activate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collab;