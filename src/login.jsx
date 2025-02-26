import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.info("Logging in...", { autoClose: 1000 });

    try {
      const loginResponse = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (loginResponse.status === 200) {
        const userData = loginResponse.data;
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userName", userData.username);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("profileImage", userData.profile_image);


        toast.success("Login successful! 🎉", { autoClose: 2000 });
        setTimeout(() => navigate("/authentication"), 1500);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Section: Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-20">
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-600 mb-8">
          Good to see you again! Let's continue your growth journey with
          FoundingPals.
        </p>

        {/* Google Signup Button */}
        <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 mb-6 hover:bg-gray-50">
          <img src="/google.png" alt="Google Icon" className="h-5 w-5 mr-2" />
          <span className="text-gray-700 font-medium">Login with Google</span>
        </button>

        <div className="text-center text-gray-400 mb-6">
          <span>or</span>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium block mb-1">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800">
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
          Forgot Password?{" "}
          </a>
          <a href="/signup" className="text-indigo-600 hover:underline">
          Signup{" "}
          </a>
        </p>
      </div>

      {/* Right Section: Image and Overlay */}
      <div className="w-1/2 relative">
        <img
          src="/image-9.png"
          alt="Teamwork"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-2xl font-semibold mb-2">FoundingPals</h2>
          <p className="text-3xl font-bold leading-tight">
            Find the startup partner <br /> you’ve been searching for
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
