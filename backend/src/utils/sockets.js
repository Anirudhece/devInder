// sockets.js
import { Server } from "socket.io";

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
    console.log("User connected 🍎", socket.id);

    socket.on("joinChat", (data) => {
      console.log(`entered joinChat 🌶️`, data);
    });
  });

  

  // return io;
};
