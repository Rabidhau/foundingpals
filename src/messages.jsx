import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./assets/sidebar";
import Message_card from "./message_card";
import Chat_area from "./chatarea";

const Messages = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [potentialMembers, setPotentialMembers] = useState([]);
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/chat/${userId}`);
        setChatList(res.data);
      } catch (err) {
        console.error("Error fetching chat rooms:", err);
      }
    };

    const fetchPotentialMembers = async () => {
      if (userRole === "Founder") {
        try {
          const res = await axios.get("http://localhost:3000/get-friend", {
            params: { userId },
          });
          setPotentialMembers(res.data);
        } catch (err) {
          console.error("Error fetching potential members:", err);
        }
      }
    };

    fetchChatList();
    fetchPotentialMembers();
  }, [userId, userRole]);

  const openChat = async (receiver) => {
    try {
      const res = await axios.post("http://localhost:3000/chat/create-room", {
        senderId: userId,
        receiverId: receiver.userId,
      });

      // Fetch messages immediately after opening the chat
      const messagesRes = await axios.get(`http://localhost:3000/messages/${res.data.roomId}`);

      setSelectedChat({ ...receiver, roomId: res.data.roomId, messages: messagesRes.data });
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  const createGroupChat = async () => {
    if (groupName.trim() === "" || selectedUsers.length === 0) {
      alert("Please provide a group name and select at least one member");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/chat/create-group", {
        creatorId: userId,
        groupName: groupName,
        memberIds: selectedUsers,
      });

      // Add the new group to the chat list
      setChatList([...chatList, res.data]);
      
      // Close the modal and reset form
      setShowGroupModal(false);
      setGroupName("");
      setSelectedUsers([]);
      
      // Optionally open the new group chat
      setSelectedChat(res.data);
    } catch (err) {
      console.error("Error creating group chat:", err);
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  // Automatically open chat if navigated from Pal_card.jsx
  useEffect(() => {
    if (location.state?.user) {
      openChat(location.state.user);
    }
  }, [location.state]);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-1/3 bg-white p-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Messages</h2>
            {userRole === "Founder" && (
              <button 
                onClick={() => setShowGroupModal(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Create Group
              </button>
            )}
          </div>
          
          {chatList.map((chat) => (
            <Message_card
              key={chat.isGroup ? `group-${chat.roomId}` : `${chat.roomId}-${chat.userId}`}
              props={chat}
              onClick={() => setSelectedChat(chat)}
            />
          ))}
        </div>

        {/* Chat Area */}
        <div className="w-2/3">
          {selectedChat ? (
            <Chat_area chatData={selectedChat} />
          ) : (
            <p className="text-center mt-10 text-gray-500">Select a conversation</p>
          )}
        </div>
      </div>

      {/* Group Creation Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Create New Group</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter group name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Select Members</label>
              <div className="max-h-60 overflow-y-auto border rounded">
                {potentialMembers.map(user => (
                  <div 
                    key={user.userId} 
                    className={`p-2 cursor-pointer ${selectedUsers.includes(user.userId) ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => toggleUserSelection(user.userId)}
                  >
                    {user.username}
                    {selectedUsers.includes(user.userId) && (
                      <span className="ml-2 text-blue-500">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  setGroupName("");
                  setSelectedUsers([]);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={createGroupChat}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;