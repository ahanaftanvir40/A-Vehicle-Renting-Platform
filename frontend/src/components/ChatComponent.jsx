import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function ChatComponent({ vehicleId, userId, ownerId, username, ownerName }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const room = `${vehicleId}-${ownerId}-${userId}`;
    socket.emit("join", { vehicleId, ownerId, userId });

    // Fetch previous messages
    axios.get(`http://localhost:3000/api/chat/${vehicleId}/${ownerId}/${userId}`)
      .then(response => {
        setMessages(response.data);
      });

    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, [vehicleId, userId, ownerId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const room = `${vehicleId}-${ownerId}-${userId}`;
    if (message) {
      socket.emit("message", { vehicleId, ownerId, userId, message, senderId: userId, username });
      setMessage("");
    }
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('my_modal_3').showModal() method */}
      <button className="btn bg-slate-800 border-none text-white hover:bg-slate-900" onClick={() => document.getElementById('my_modal_3').showModal()}>Chat With Owner</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-fit h-fit dark:bg-zinc-700" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
          </form>

          <div className="w-full h-full mx-auto p-6 ">
            <h1 className="text-2xl font-bold mb-4 text-center dark:text-white/80">Chat with Owner {ownerName}</h1>
            <div ref={chatContainerRef} className="chat-messages overflow-hidden flex flex-col space-y-4 overflow-y-auto max-h-72 p-4 border-2 border-gray-300 dark:border-gray-400 rounded-lg bg-gray-50 dark:bg-zinc-700">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message p-3 rounded-lg ${msg.senderId === userId ? "bg-teal-100 self-end" : "bg-gray-200 self-start"}`}
                  style={{}}
                >
                  <div className="text-sm font-semibold text-gray-600">{msg.username}</div>
                  <div className="text-black">{msg.message}</div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-teal-500"
              />
              <button type="submit" className="p-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600">
                Send
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ChatComponent;
