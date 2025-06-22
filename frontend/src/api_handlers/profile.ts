import axios from "axios";
import { HEADERS } from "../utils/getHeader";
import { BASE_URL } from "@/utils/constants";

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/view`, {
      headers: HEADERS,
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};
