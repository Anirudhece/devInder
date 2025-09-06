"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "../../../utils/sockets";
import { useSelector } from "react-redux";

interface PageProps {
  params: { id: string };
}

interface Message {
  firstName: string;
  message: string;
  time: string;
  isReceived: boolean;
}

const ChatSlug: React.FC<PageProps> = ({ params }) => {
  const user = useSelector((state: any) => state.user);
  const targetUserIdRef = useRef<string>("");

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMessageReceived = (data: any) => {
    if (data?.userId === user?._id) return; // ignore own messages

    setMessages((prev) => [
      ...prev,
      {
        firstName: data?.firstName,
        message: data?.message,
        time: new Date().toLocaleTimeString(),
        isReceived: true,
      },
    ]);
  };

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      firstName: user?.firstName || "Anonymous",
      message: inputText,
      time: new Date().toLocaleTimeString(),
      isReceived: false,
    };

    socket?.emit("sendMessage", {
      ...newMessage,
      targetUserId: targetUserIdRef.current,
      userId: user?._id,
    });

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  useEffect(() => {
    const loadDetails = async () => {
      const { id: targetUserId } = await params;
      targetUserIdRef.current = targetUserId;

      socket.connect();

      socket.emit("joinChat", { targetUserId, userId: user?._id });

      socket.off("messageRecieved"); // clear old listeners if any
      socket.on("messageRecieved", handleMessageReceived);
    };
    loadDetails();

    return () => {
      socket.off("messageRecieved", handleMessageReceived);
      socket.disconnect();
      console.log("Socket disconnected 🚪");
    };
  }, []);

  const ChatBubble: React.FC<{ msg: Message }> = ({ msg }) => {
    const isReceived = msg.isReceived;
    const avatar = user?.photoUrl || "/default-avatar.png";

    if (isReceived) {
      return (
        <div className="grid pb-6">
          <div className="flex gap-2.5 mb-4">
            <img src={avatar} alt="Sender" className="w-10 h-10 rounded-full" />
            <div className="grid">
              <h5 className="text-sm font-semibold pb-1">{msg.firstName}</h5>
              <div className="w-max grid">
                <div className="px-3.5 py-2 bg-gray-100 rounded">
                  <p className="text-gray-900 text-sm">{msg.message}</p>
                </div>
                <p className="text-gray-500 text-xs py-1">{msg.time}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-2.5 justify-end pb-6">
        <div className="grid text-right">
          <h5 className="text-sm font-semibold pb-1">{msg.firstName}</h5>
          <div className="w-max grid ml-auto">
            <div className="px-3.5 py-2 bg-indigo-100 rounded">
              <p className="text-gray-900 text-sm">{msg.message}</p>
            </div>
            <p className="text-gray-500 text-xs py-1">{msg.time}</p>
          </div>
        </div>
        <img src={avatar} alt="You" className="w-10 h-10 rounded-full" />
      </div>
    );
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="border-4 p-3 rounded-2xl w-1/2">
        <div className="h-[60vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} msg={msg} />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3 border rounded-3xl px-3 py-2">
          <input
            className="flex-grow text-sm focus:outline-none"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.04 6.959L6.54 9.457M6.9 10.072l.134.233c1.276 2.205 1.914 3.307 2.772 3.22.857-.088 1.26-1.296 2.066-3.713l1.156-3.467c.736-2.208 1.104-3.312.522-3.895-.582-.583-1.686-.215-3.894.521L6.187 4.128C3.77 4.934 2.562 5.337 2.475 6.194c-.088.857 1.015 1.495 3.22 2.772l.233.134c.306.177.459.266.583.389.123.124.212.277.389.583z"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="ml-2 text-xs font-semibold">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSlug;
