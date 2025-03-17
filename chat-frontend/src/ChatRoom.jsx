import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:4000"); // Connect to your backend server

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:4000/messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (!message.trim()) return; // Don't send empty messages
    try {
      await fetch("http://localhost:4000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, message }),
      });
      // Clear the message input after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const joinChat = (e) => {
    e.preventDefault();
    if (user.trim()) {
      setIsJoined(true);
    }
  };

  // Listen for real-time updates from the server (new messages)
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Fetch initial messages when the component mounts
    fetchMessages();

    return () => {
      socket.off("newMessage"); // Clean up the event listener when the component is unmounted
    };
  }, []);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-[#00246b] text-white px-6 py-4">
        <h2 className="text-2xl m-0">Chat Room</h2>
        {isJoined && <p className="m-0">Welcome, {user}!</p>}
      </div>

      {!isJoined ? (
        <div className="flex-1 flex justify-center items-center p-6 bg-[#f0f5ff]">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h3 className="mt-0 text-[#00246b]">Join the Conversation</h3>
            <form onSubmit={joinChat} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-[#00246b]/30"
              />
              <button 
                type="submit"
                className="bg-[#00246b] text-white border-none rounded-full px-6 py-3 text-base cursor-pointer transition-colors hover:bg-[#003399] focus:outline-none focus:ring-2 focus:ring-[#00246b]/30"
              >
                Join Chat
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-[#f0f5ff]">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 p-5">No messages yet. Be the first to say hello!</div>
            ) : (
              <ul className="p-0 m-0 list-none">
                {messages.map((msg) => (
                  <li key={msg._id} className={user === msg.user ? "flex justify-end mb-4" : "flex mb-4"}>
                    <div className={`max-w-[70%] p-3 rounded-2xl relative ${
                      user === msg.user 
                      ? "bg-[#00246b] text-white rounded-br-sm" 
                      : "bg-[#8ab6f9] text-[#00246b] rounded-bl-sm"
                    }`}>
                      <div className={`font-bold text-sm mb-1 ${user === msg.user ? "text-right" : ""}`}>
                        {msg.user}
                      </div>
                      <div>{msg.message}</div>
                    </div>
                  </li>
                ))}
                <div ref={messagesEndRef} />
              </ul>
            )}
          </div>
          <form className="flex p-4 bg-white border-t border-gray-200" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-full mr-2 text-base focus:outline-none focus:ring-2 focus:ring-[#00246b]/30"
            />
            <button 
              type="submit"
              className="bg-[#00246b] text-white border-none rounded-full px-6 py-3 text-base cursor-pointer transition-colors hover:bg-[#003399] focus:outline-none focus:ring-2 focus:ring-[#00246b]/30"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
