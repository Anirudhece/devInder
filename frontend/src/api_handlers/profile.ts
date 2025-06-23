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

export const profileEdit = async (updatedInfo: {
  firstName: string;
  lastName: string;
  age: string | number;
  gender: string;
  about: String;
}) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/profile/edit`,
      { ...updatedInfo },
      {
        headers: HEADERS,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};
