import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function OwnerChatComponent({ vehicleId, ownerId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userIds, setUserIds] = useState([]);
  const [userNames, setUserNames] = useState([])


  useEffect(() => {
    // Fetch unique user IDs that the owner has chatted with
    axios.get(`http://localhost:3000/api/ownerChats/${vehicleId}/${ownerId}`)
      .then(response => {
        setUserIds(response.data.userIds);

        setUserNames(response.data.userNames)
      });

    // Join the owner's room
    socket.emit("join", { vehicleId, ownerId });

    // Listen for new user notifications
    socket.on('newUser', ({ userId }) => {
      setUserIds((prevUserIds) => [...prevUserIds, userId]);
    });

    return () => {
      socket.off('newUser');
    };
  }, [vehicleId, ownerId, userIds]);

  useEffect(() => {
    if (currentUserId) {
      const room = `${vehicleId}-${ownerId}-${currentUserId}`;
      socket.emit("join", { vehicleId, ownerId, userId: currentUserId });

      axios.get(`http://localhost:3000/api/chat/${vehicleId}/${ownerId}/${currentUserId}`)
        .then(response => {
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

  return (
    <div className="chat-container p-4">
      <h1 className="text-2xl font-bold mb-4">Owner Chat</h1>
      <div className="user-list mb-4">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        {userIds.map((userId, index) => (
          <div key={index} className="flex items-center mb-2">
            <p className="mr-2">{userNames[index]}</p>
            <button
              className="py-1 px-2 bg-blue-600 text-white rounded"
              onClick={() => setCurrentUserId(userId)}
            >
              Chat
            </button>
          </div>
        ))}
      </div>
      {currentUserId && (
        <div className="chat-box bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Chatting with {userNames[userIds.indexOf(currentUserId)]}</h2>
          <div className="chat-messages h-64 overflow-y-auto mb-4 p-2 border rounded">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message p-2 bg-gray-200 rounded mb-1 text-black">
                {msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded mr-2"
            />
            <button type="submit" className="py-2 px-4 bg-green-600 text-white rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default OwnerChatComponent;
