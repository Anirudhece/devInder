import axios from "axios";
import { HEADERS } from "../utils/getHeader";
import { User } from "@/types/userTypes";
import { BASE_URL } from "@/utils/constants";

interface LoginDataInterface {
  msg: string | undefined;
  user: User | undefined;
  err?: string;
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
    return {
      msg: undefined,
      user: undefined,
      err: error?.response?.data?.msg ?? "Something went wrong",
    };
  }
};

const callLogoutApi = async () => {
  try {
    const endPoint = `${BASE_URL}/logout`;
    const response = await axios.post(
      endPoint,
      {},
      { headers: HEADERS, withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

const callSignUpApi = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const endPoint = `${BASE_URL}/signup`;
    const response = await axios.post(
      endPoint,
      { email: username, password, firstName, lastName },
      { headers: HEADERS, withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
  }
};

export default callLoginApi;
export { callLogoutApi, callSignUpApi };
