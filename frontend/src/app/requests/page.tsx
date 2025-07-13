"use client";
import { callRequestReviewApi } from "@/api_handlers/request";
import { callGetRequestRecievedApi } from "@/api_handlers/users";
import { addRequests, removeRequest } from "@/lib/features/request/requestSlice";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store: RootState) => store.requests);
  console.log(requests);

  useEffect(() => {
    const getRequests = async () => {
      try {
        if (requests) {
          return;
        }
        const pendingRequestRecieved = await callGetRequestRecievedApi();

        if (!pendingRequestRecieved?.success) {
          return;
        }
        dispatch(addRequests(pendingRequestRecieved?.requests));
      } catch (error) {
        console.log(`error on Requests useEffect : `, error);
      }
    };
    getRequests();
  }, []);

  const handleRequest = async (
    status: string,
    toUserId: string,
    connectionRequestId: string
  ) => {
    await callRequestReviewApi(status, toUserId, connectionRequestId);
    dispatch(removeRequest(connectionRequestId));
    return;
  };

  const renderConnections = () => {
    if (!requests) {
      return null;
    }

    return requests?.map((request: any, ind: number) => {
      const { firstName, lastName, photoUrl, age, gender, about } =
        request?.fromUserId;
      return (
        <div
          key={ind}
          className="w-full md:w-2/3 flex mx-auto items-center justify-between my-3 p-3 md:p-4 rounded-lg bg-base-300"
        >
          <div className="flex">
            <div>
              <img
                className="w-20 h-20 rounded-full"
                loading="lazy"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="text-xl font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <h2>
                  {age} , {gender}
                </h2>
              )}
              {about && <h2>{about}</h2>}
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() =>
                handleRequest("accepted", request?.toUserId, request?._id)
              }
              className="btn btn-primary"
            >
              Accept
            </button>
            <button
              onClick={() =>
                handleRequest("rejected", request?.toUserId, request?._id)
              }
              className="btn btn-secondary"
            >
              Reject
            </button>
          </div>
        </div>
      );
    });
  };

  if (requests?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center mt-2 text-2xl"> No requests found </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center mt-2 text-2xl">
        {" "}
        This is Connection Request page{" "}
      </h1>
      {renderConnections()}
    </>
  );
}
