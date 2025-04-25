
import { useEffect, useState } from "react";

const Subheader = () => {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    // Set Profile Image from Local Storage
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(`http://localhost:3000${storedImage}`);
    }
  }, []);

  return (
    <header className="flex items-center justify-end mb-6">
      {/* Profile Image (Without Dropdown) */}
      <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
        <img src={profileImage || "/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
      </div>
    </header>
  );
};

export default Subheader;