import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./assets/sidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [qualification, setQualification] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    if (!userId) {
      window.location.href = "/login"; // Redirect if no userId in localStorage
    } else {
      axios
        .get("http://localhost:3000/get-profile", {
          params: { userId },
        })
        .then((response) => {
          setUser(response.data);
          setQualification(response.data.qualification || "");
          setBio(response.data.bio || "");
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching user data.");
          setLoading(false);
        });
    }
  }, [userId]);

  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/update-profile", {
        userId,
        qualification,
        bio,
      })
      .then(() => {
        toast.success("Profile updated successfully!"); // Show success toast
        navigate("/home"); // Redirect to homepage after successful update
      })
      .catch((error) => {
        toast.error("Error updating profile!"); // Show error toast if update fails
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="p-8 w-full bg-white shadow-lg rounded-lg items-center space-x-8">
        {user && (
          <>
            <div className="flex items-center justify-center mb-6">
              <img
                src={`http://localhost:3000${user.profile_image}`}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
              />
            </div>

            {/* Display Name and Email under Profile Picture */}
            <div className="text-center text-2xl font-semibold text-gray-800">
              {user.username}
            </div>
            <div className="text-center text-xl font-medium text-gray-600 mt-2">
              {user.email}
            </div>

            <div className="mt-6">
              {/* Qualification input field */}
              <div className="mt-6">
                <label className="text-2xl font-medium text-gray-600">Qualification</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 text-xl"
                  placeholder="Enter your qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </div>

              {/* Bio input field */}
              <div className="mt-6">
                <label className="text-2xl font-medium text-gray-600">Bio</label>
                <textarea
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mt-2 text-xl"
                  placeholder="Write something about yourself"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>

              {/* Update Profile button */}
              <button
                className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-full text-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;