"use client";

import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../../utils/sockets";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

interface PageProps {
  params: { id: string };
}

interface Message {
  firstName: string;
  message: string;
  time: string;
  isReceived: boolean;
  photoUrl?: string;
}

const ChatSlug: React.FC<PageProps> = ({ params }) => {
  const user = useSelector((state: any) => state.user);
  const targetUserIdRef = useRef<string>("");
  const searchParams = useSearchParams();

  const targetPhotoUrl =
    "data:image/jpeg;base64,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"; //searchParams.get("targetPhotoUrl") || "/default-avatar.png";

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
        // photoUrl: data?.photoUrl || "/default-avatar.png",
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
      // photoUrl: user?.photoUrl || "/default-avatar.png",
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
            {/* <img src={avatar} alt="Sender" className="w-10 h-10 rounded-full" /> */}
            <img
              src={targetPhotoUrl}
              alt="Sender"
              className="w-10 h-10 rounded-full"
            />
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
        {/* <img src={user?.photoUrl || "/default-avatar.png"} alt="You" className="w-10 h-10 rounded-full" /> */}
        <img src={avatar} alt="You" className="w-10 h-10 rounded-full" />
      </div>
    );
  };

  return (
    <div className="mt-4 flex justify-center px-2">
      <div className="border-4 p-3 rounded-2xl w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
        <div className="h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} msg={msg} />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3 border rounded-3xl px-2 sm:px-3 py-2">
          <input
            className="flex-grow text-sm focus:outline-none min-w-0"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-full"
          >
            {/* send icon */}
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
            <span className="ml-2 text-xs font-semibold hidden sm:inline">
              Send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSlug;
