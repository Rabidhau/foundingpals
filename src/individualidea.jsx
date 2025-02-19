import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./jobcard";
import { useNavigate } from "react-router-dom";

const IndividualIdea = () => {
  const [ideaInfo, setIdeaInfo] = useState({});
  const [ideaList, setIdeaList] = useState([]);
  const [appliedTalents, setAppliedTalents] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const userRole = localStorage.getItem("userRole");

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
    try {
      const response = await axios.post("http://localhost:3000/update-talent-status", {
        ideaId: id,
        talentId,
        status,
      });

      if (response.status === 200) {
        toast.success(`Talent ${status === "accepted" ? "Accepted" : "Rejected"} Successfully 🎉`);
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
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <h2 className="text-xl font-semibold">{ideaInfo.ideaTitle}</h2>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Idea Details</h3>
              <p>{ideaInfo.ideaInfo}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Requirements</h3>
              <p>{ideaInfo.requirements}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Idea Stage</h3>
              <p>{ideaInfo.ideaStage}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Equity</h3>
              <p>{ideaInfo.equity}</p>
            </div>

            {userRole === "Talent" && (
              <button
                className={clsx(
                  "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                  dayjs(ideaInfo.submitBy).isBefore(new Date())
                    ? "bg-gray-600 pointer-events-none"
                    : "bg-indigo-600"
                )}
                disabled={dayjs(ideaInfo.submitBy).isBefore(new Date())}
                onClick={handleApply}
              >
                Apply Now
              </button>
            )}

            {userRole === "Founder" && (
              <p className="text-red-500 mt-4">
                Only Talents can apply for ideas.
              </p>
            )}
          </div>
        </div>
        {localStorage.getItem("userRole") === "Talent" && (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-black leading-tight mt-12 mb-8">
              Recommended Ideas
            </h1>

            <div className="grid grid-cols-3 gap-5">
              {ideaList.slice(0, 3).map((list) => (
                <JobCard props={list} key={list.id} />
              ))}
            </div>
          </>
        )}
        {/* Founder View: Show Applied Talents Table */}
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
                  {appliedTalents.map((talent, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 border-b">{talent.name}</td>
                      <td className="py-3 px-4 border-b">{talent.email}</td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={clsx(
                            "px-3 py-1 rounded-full text-sm font-medium",
                            talent.status === "accepted"
                              ? "bg-green-200 text-green-800"
                              : talent.status === "rejected"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          )}
                        >
                          {talent.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <button
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                          onClick={() => handleAcceptReject(talent.id, "accepted"||1)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          onClick={() => handleAcceptReject(talent.id, "rejected"||0)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No talents have applied yet.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default IndividualIdea;