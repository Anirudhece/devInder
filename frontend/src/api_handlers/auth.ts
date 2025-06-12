import axios from "axios";
import { HEADERS } from "../utils/getHeader";

// Interfaces
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  __v: number;
  skills: any[];
}

interface LoginDataInterface {
  msg: string;
  user: User;
}

const callLoginApi = async (
  username: string,
  password: string
): Promise<LoginDataInterface | undefined> => {
  try {
    const endPoint = `${process.env.NEXT_PUBLIC_BACKENDHOST}/signin`;
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

export default callLoginApi;
