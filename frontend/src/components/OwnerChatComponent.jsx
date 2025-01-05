import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function OwnerChatComponent({ vehicleId, ownerId, ownerName, username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userIds, setUserIds] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Fetch unique user IDs that the owner has chatted with
    axios
      .get(`http://localhost:3000/api/ownerChats/${vehicleId}/${ownerId}`)
      .then((response) => {
        setUserIds(response.data.userIds);
        setUserNames(response.data.userNames);
      });

    // Join the owner's room
    socket.emit("join", { vehicleId, ownerId });

    // Listen for new user notifications
    socket.on("newUser", ({ userId }) => {
      setUserIds((prevUserIds) => [...prevUserIds, userId]);
    });

    return () => {
      socket.off("newUser");
    };
  }, [vehicleId, ownerId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (currentUserId) {
      const room = `${vehicleId}-${ownerId}-${currentUserId}`;
      socket.emit("join", { vehicleId, ownerId, userId: currentUserId });

      axios
        .get(`http://localhost:3000/api/chat/${vehicleId}/${ownerId}/${currentUserId}`)
        .then((response) => {
          setMessages(response.data);
        });

      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [vehicleId, ownerId, currentUserId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && currentUserId) {
      socket.emit("message", { vehicleId, ownerId, userId: currentUserId, message, senderId: ownerId });
      setMessage("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUserId(null);
  };

  return (
    <div>
      <div className="chat-container p-4">
        <h1 className="text-2xl font-bold mb-4">Owner Chat</h1>
        <div className="user-list mb-4">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          {userIds.map((userId, index) => (
            <div key={index} className="flex items-center mb-2">
              <p className="mr-2">{userNames[index]}</p>
              <button
                className="py-1 px-2 bg-blue-600 text-white rounded"
                onClick={() => {
                  setCurrentUserId(userId);
                  setIsModalOpen(true);
                }}
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-lg mx-4 p-6 relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:text-white"
            >
              ✖
            </button>
            <h1 className="text-2xl font-bold mb-4 text-center dark:text-white/80">
              Chat with {userNames[userIds.indexOf(currentUserId)]}
            </h1>
            <div
              ref={chatContainerRef}
              className="chat-messages overflow-hidden flex flex-col space-y-4 overflow-y-auto max-h-72 p-4 border-2 border-gray-300 dark:border-gray-400 rounded-lg bg-gray-50 dark:bg-zinc-700"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message p-3 rounded-lg ${
                    msg.senderId === ownerId ? "bg-teal-100 self-end" : "bg-gray-200 self-start"
                  }`}
                >
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{msg.username}</div>
                  <div className="text-black dark:text-white">{msg.message}</div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-white p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-teal-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white"
              />
              <button
                type="submit"
                className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerChatComponent;
