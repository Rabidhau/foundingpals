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
    <main className="bg-gray-100 min-h-screen pt-20 px-8 pb-20">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-10">Idea Details</h1>
  
      <div className="container mx-auto max-w-5xl">
        {/* Idea Card */}
{/* Idea Card with Profile on the Left */}
<div className="bg-white shadow-xl rounded-2xl p-8 transition hover:shadow-2xl flex flex-col lg:flex-row gap-8">
  {/* Founder Profile Section */}
  <div className="w-full lg:w-1/3 flex flex-col items-center text-center border-r border-gray-200 pr-4">
    <img
      src={`http://localhost:3000${ideaInfo.profile_image}`} // fallback image
      alt="Founder"
      className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
    />
    <h3 className="text-xl font-semibold text-indigo-700">{ideaInfo.username}</h3>
    <p className="text-gray-600 text-sm mt-1">{ideaInfo.bio}</p>
    <p className="text-gray-500 text-sm mt-1">{ideaInfo.qualification}</p>
    <p className="text-gray-400 text-sm mt-1">{ideaInfo.email}</p>
  </div>

  {/* Idea Information Section */}
  <div className="w-full lg:w-2/3">
    <h2 className="text-3xl font-semibold text-indigo-600 mb-2">{ideaInfo.ideaTitle}</h2>
    <p className="text-gray-600 mt-2"><strong>Details:</strong> {ideaInfo.ideaInfo}</p>
    <p className="text-gray-600 mt-2"><strong>Requirements:</strong> {ideaInfo.requirements}</p>
    <p className="text-gray-600 mt-2"><strong>Stage:</strong> {ideaInfo.ideaStage}</p>
    <p className="text-gray-600 mt-2"><strong>Equity:</strong> {ideaInfo.equity}</p>

    {userRole === "Talent" && (
      <button
        onClick={handleApply}
        disabled={dayjs(ideaInfo.submitBy).isBefore(new Date())}
        className={clsx(
          "mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all",
          dayjs(ideaInfo.submitBy).isBefore(new Date()) && "bg-gray-500 cursor-not-allowed"
        )}
      >
        Apply Now
      </button>
    )}
  </div>
</div>
  
        {/* Recommended Ideas */}
        {userRole === "Talent" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-6">More Ideas</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {[...ideaList]
  .sort(() => Math.random() - 0.5) // shuffle the list
  .slice(0, 3) // take first 3
  .map((list) => (
    <JobCard key={list.id} props={list} isExplorePage={isExplorePage} userRole={userRole} />
))}
            </div>
          </>
        )}
  
        {/* Founder View: Applied Talents */}
        {userRole === "Founder" && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Talents</h2>
  
            {appliedTalents.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-indigo-50">
                    <tr>
                      {["Name", "Bio", "Email", "Qualifications", "Status", "Actions"].map((heading) => (
                        <th
                          key={heading}
                          className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {appliedTalents.map((talent) => {
                      let statusText, statusClass;
  
                      if (talent.status === 1) {
                        statusText = "Accepted";
                        statusClass = "text-green-600 bg-green-100";
                      } else if (talent.status === 0) {
                        statusText = "Rejected";
                        statusClass = "text-red-600 bg-red-100";
                      } else {
                        statusText = "Pending";
                        statusClass = "text-yellow-600 bg-yellow-100";
                      }
  
                      return (
                        <tr key={talent.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">{talent.name}</td>
                          <td className="px-6 py-4">{talent.bio}</td>
                          <td className="px-6 py-4">{talent.email}</td>
                          <td className="px-6 py-4">{talent.qualification}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}>
                              {statusText}
                            </span>
                          </td>
                          <td className="px-6 py-4 space-x-2">
  {talent.status === null ? (
    showReasonInput[talent.id] ? (
      <div className="flex flex-col gap-2">
        <textarea
          className="border p-2 rounded w-full text-sm"
          placeholder="Enter rejection reason"
          value={rejectionReasons[talent.id] || ""}
          onChange={(e) =>
            setRejectionReasons({
              ...rejectionReasons,
              [talent.id]: e.target.value,
            })
          }
        />
        <button
          onClick={() => handleAcceptReject(talent.id, 0)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Submit Rejection
        </button>
      </div>
    ) : (
      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => handleAcceptReject(talent.id, 1)}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() =>
            setShowReasonInput({ ...showReasonInput, [talent.id]: true })
          }
        >
          Reject
        </button>
      </div>
    )
  ) : talent.status === 1 ? (
    <button
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      onClick={() => navigate("/contracts/agreement")}
    >
      Create Agreement
    </button>
  ) : (
    <span className="text-gray-400 italic">Decision Made</span>
  )}
</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No applied talents found.</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default IndividualIdea;
