// sockets.js
import { Server } from "socket.io";

const getRoomId = (targetUserId, userId) => {
  const roomId = [targetUserId, userId].sort().join("_");
  return roomId;
};

export const initialiseSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://16.171.2.113:3000",
        "http://16.171.2.113:4000",
        "https://3000-firebase-devinder-1747476670920.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ targetUserId, userId }) => {
      const roomId = getRoomId(targetUserId, userId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, targetUserId, message, userId }) => {
      const roomId = getRoomId(targetUserId, userId);
      io.to(roomId).emit("messageRecieved", { firstName, message, userId });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // return io;
};
