import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobCard from "./jobcard";
import { useLocation } from "react-router-dom";

const IndividualIdea = () => {
  const [ideaInfo, setIdeaInfo] = useState({});
  const [ideaList, setIdeaList] = useState([]);
  const [appliedTalents, setAppliedTalents] = useState([]);
  const [showReasonInput, setShowReasonInput] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route
  const { id } = useParams();
  const userRole = localStorage.getItem("userRole");

  const isExplorePage = location.pathname.startsWith("/explore");

  const handleApply = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post("http://localhost:3000/apply-idea", {
        ideaId: id,
        talentId: userId,
      });

      if (response.status === 200) {
        toast.success("Idea Applied Successfully 🎉");
        navigate("/home");
      } else {
        toast.error("Error Applying Job 😢");
      }
    } catch (error) {
      toast.error(error?.response?.data || "Something went wrong!");
      console.error(error);
    }
  };

  const fetchAppliedTalents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/get-talent/${id}`);
      setAppliedTalents(response?.data?.talents || []);
    } catch (error) {
      console.error("Error fetching applied talents:", error);
      setAppliedTalents([]);
    }
  };

  const handleAcceptReject = async (talentId, status) => {
    const reason = status === 0 ? rejectionReasons[talentId] : null;

    if (status === 0 && !reason) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/update-talent-status", {
        ideaId: id,
        talentId,
        status,
        rejectionReason: reason,
      });

      if (response.status === 200) {
        toast.success(`Talent ${status === 1 ? "Accepted" : "Rejected"} Successfully 🎉`);
        fetchAppliedTalents(); // Refresh applied talents after update
      } else {
        toast.error("Error updating talent status 😢");
      }
    } catch (error) {
      toast.error(error?.response?.data || "Something went wrong!");
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/get-all-Idea")
      .then((response) => setIdeaList(response?.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/show-idea/${id}`)
        .then((response) => setIdeaInfo(response?.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  useEffect(() => {
    if (id && userRole === "Founder") {
      fetchAppliedTalents();
    }
  }, [id, userRole]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-gray-200 pt-20 px-20 pb-20">
      <h1 className="text-4xl font-bold">Idea Detail</h1>
      <div className="container mt-20 mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4 p-4">
          <h2 className="text-xl font-semibold">{ideaInfo.ideaTitle}</h2>
          <p className="mt-4"><strong>Details:</strong> {ideaInfo.ideaInfo}</p>
          <p className="mt-4"><strong>Requirements:</strong> {ideaInfo.requirements}</p>
          <p className="mt-4"><strong>Stage:</strong> {ideaInfo.ideaStage}</p>
          <p className="mt-4"><strong>Equity:</strong> {ideaInfo.equity}</p>

          {userRole === "Talent" && (
            <button
              className={clsx(
                "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                dayjs(ideaInfo.submitBy).isBefore(new Date()) ? "bg-gray-600 pointer-events-none" : "bg-indigo-600"
              )}
              disabled={dayjs(ideaInfo.submitBy).isBefore(new Date())}
              onClick={handleApply}
            >
              Apply Now
            </button>
          )}
        </div>

        {userRole === "Talent" && (
  <>
    <h1 className="text-4xl font-bold mt-12 mb-8">Recommended Ideas</h1>
    <div className="grid grid-cols-3 gap-5">
      {ideaList.slice(0, 3).map((list) => (
        <JobCard props={list} key={list.id} isExplorePage={isExplorePage} userRole={userRole} />
      ))}
    </div>
  </>
)}

        {userRole === "Founder" && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Applied Talents</h2>
            {appliedTalents.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Name</th>
                    <th className="py-3 px-4 border-b text-left">Email</th>
                    <th className="py-3 px-4 border-b text-left">Status</th>
                    <th className="py-3 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {appliedTalents.map((talent) => {
  let statusText, statusClass;

  if (talent.status === 1) {
    statusText = "Accepted";
    statusClass = "text-green-700 border-green-300 bg-green-100";
  } else if (talent.status === 0) {
    statusText = "Rejected";
    statusClass = "text-red-700 border-red-300 bg-red-100";
  } else {
    statusText = "Pending";
    statusClass = "text-yellow-700 border-yellow-300 bg-yellow-100";
  }

  return (
    <tr key={talent.id} className="hover:bg-gray-50 transition">
      <td className="py-3 px-4 border-b">{talent.name}</td>
      <td className="py-3 px-4 border-b">{talent.email}</td>
      <td className="py-3 px-4 border-b ">
        <span className={`px-3 py-1 border rounded-full ${statusClass}`}>
          {statusText}
        </span>
      </td>
                        <td className="py-3 px-4 border-b">
                          {talent.status === null ? (
                            <>
                              {showReasonInput[talent.id] ? (
                                <div className="flex items-center">
                                  <textarea
                                    className="border rounded p-2 mr-2"
                                    placeholder="Enter rejection reason"
                                    value={rejectionReasons[talent.id] || ""}
                                    onChange={(e) =>
                                      setRejectionReasons({ ...rejectionReasons, [talent.id]: e.target.value })
                                    }
                                  />
                                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => handleAcceptReject(talent.id, 0)}>
                                    Submit
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <button className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600" onClick={() => handleAcceptReject(talent.id, 1)}>Accept</button>
                                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => setShowReasonInput({ ...showReasonInput, [talent.id]: true })}>Reject</button>
                                </>
                              )}
                            </>
                          ) : <span className="text-gray-500">Decision Made</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : <p className="text-gray-500">No talents have applied yet.</p>}
          </div>
        )}
      </div>
    </main>
  );
};

export default IndividualIdea;
