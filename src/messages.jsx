import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Sidebar from "./assets/sidebar";
import Subheader from "./assets/subheader";

const messages = [
  { name: "Adriana O'Sullivan", status: "typing...", unread: 2 },
  { name: "Olly Schroeder", status: "2 min ago", unread: 0, active: true },
  { name: "Leyton Fields", status: "1 day ago", message: "Wow really cool 🔥" },
  { name: "Noel Baldwin", status: "1 day ago", message: "Let's have a call tonight" },
  { name: "Marco Kelly", status: "1 day ago", message: "How are you?", unread: 2 },
  { name: "Rhea Levine", status: "1 day ago", message: "Thank you for your suggestion" },
];

const chatMessages = [
  { sender: "Eduard", text: "Hi Olly! Thanks for connecting with me...", time: "10:35 pm", self: true },
  { sender: "Olly Schroeder", text: "Hi Eduard! Absolutely, I’d love to help...", time: "10:35 pm", self: false },
  { sender: "Eduard", text: "Sure. I usually start my day at 8 AM...", time: "10:35 pm", self: true },
  { sender: "Olly Schroeder", text: "That sounds tough. Have you tried setting boundaries...", time: "10:35 pm", self: false },
];

const Messages = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Messages List */}
        <div className="w-1/3 bg-white p-4 border-r">
          <h2 className="text-2xl font-semibold mb-4">Messages</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search..."
          />
          <div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer ${
                  msg.active ? "bg-gray-300" : ""
                }`}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="font-semibold">{msg.name}</p>
                  <p className="text-sm text-gray-500">{msg.status}</p>
                </div>
                {msg.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {msg.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center p-4 border-b bg-white">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="font-semibold">Olly Schroeder</p>
              <p className="text-sm text-green-500">Active now</p>
            </div>
            <FiMoreHorizontal className="text-xl cursor-pointer" />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-3 flex ${msg.self ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs p-3 rounded-lg shadow-md ${msg.self ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-400 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-white flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Write a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;