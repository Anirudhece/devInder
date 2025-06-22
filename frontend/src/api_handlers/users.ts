import axios from "axios";
import { HEADERS } from "../utils/getHeader";
import { BASE_URL } from "@/utils/constants";

export const callFeedApi = async () => {
  try {
    const endPoint = `${BASE_URL}/users/feed`;
    const response = await axios.get(endPoint, {
      headers: HEADERS,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error in callFeed: `,error);
  }
};
