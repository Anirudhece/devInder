import axios from "axios";
import { HEADERS } from "../utils/getHeader";
import { BASE_URL } from "@/utils/constants";

export const callRequestReviewApi = async (
  status: string,
  toUserId: string,
  connectionRequestId: string
) => {
  try {
    const endPoint = `${BASE_URL}/request/review/${status}/${toUserId}`;
    const response = await axios.post(
      endPoint,
      { connectionRequestId },
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

export const callRequestSendApi = async (status: string, toUserId: string) => {
  try {
    const endPoint = `${BASE_URL}/request/send/${status}/${toUserId}`;
    const response = await axios.post(
      endPoint,
      {},
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
