import { io } from "socket.io-client";
import { BASE_URL } from "./constants";


const getUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return io(BASE_URL, {
      withCredentials: true,
      autoConnect: false,
    });
  }

  return io(`/`, {
    path: `/api/socket.io`,
    withCredentials: true,
    autoConnect: false,
  });
};

export const socket = getUrl();
