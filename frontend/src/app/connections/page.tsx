"use client";

import { callUserConnection } from "@/api_handlers/users";
import { addConnections } from "@/lib/features/connections/connectionSlice";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Connection() {
  const dispatch = useDispatch();
  const connections = useSelector((store: RootState) => store.connections);

  useEffect(() => {
    const fetchData = async () => {
      const userConnectionData = await callUserConnection();
      console.log(`userConnectionData 🥐: `, userConnectionData?.requests);
      dispatch(addConnections(userConnectionData?.requests));
    };
    fetchData();
  }, []);

  const renderConnections = () => {
    if (!connections) {
      return null;
    }

    return connections.map((connection: any, ind: number) => {
      const { firstName, lastName, photoUrl, age, gender, about } = connection;
      return (
        <div className="flex m-3 p-3 rounded-lg bg-base-300" key={ind}>
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
      );
    });
  };

  if (connections?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-center mt-2 text-2xl"> No connections found </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center mt-2 text-2xl"> This is Connection page </h1>
      {renderConnections()}
    </>
  );
}
