import axios from "axios";
import { HEADERS } from "../utils/getHeader";
import { User } from "@/types/userTypes";
import { BASE_URL } from "@/utils/constants";

interface LoginDataInterface {
  msg: string;
  user: User;
}

const callLoginApi = async (
  username: string,
  password: string
): Promise<LoginDataInterface | undefined> => {
  try {
    const endPoint = `${BASE_URL}/signin`;
    const response = await axios.post(
      endPoint,
      { email: username, password },
      { headers: HEADERS, withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};

const fetchUser = async () => {
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

export default callLoginApi;
export {fetchUser};