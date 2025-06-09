import axios from "axios";
import { HEADERS } from "../utils/getHeader";
const callLoginApi = async (username: string, password: string) => {
  try {
    const endPoint = `${process.env.NEXT_PUBLIC_BACKENDHOST}/signin`;
    await axios.post(endPoint, { email: username, password }, { headers: HEADERS });
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
  }
};

export default callLoginApi;
