"use client";
import { fetchUser } from "@/api_handlers/profile";
import { callFeedApi } from "@/api_handlers/users";
import { addfeed } from "@/lib/features/feeds/feedSlice";
import { addUser } from "@/lib/features/users/userSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((store: RootState) => store.user);
  const feedData = useSelector((store: RootState) => store.feed);

  //effects
  useEffect(() => {
    const fetchData = async () => {
      await loadUserData();
      await getFeed();
    };
    fetchData();
  }, []);

  //functions
  const loadUserData = async () => {
    if (userData) {
      return;
    }
    const data = await fetchUser();
    if (!data) {
      router.push("/login");
      return;
    }
    dispatch(addUser(data));
  };

  const getFeed = async () => {
    if (feedData) {
      return;
    }
    const data = await callFeedApi();
    dispatch(addfeed(data?.users));
  };

  const userCard = (feed: any) => {
    const { firstName, lastName, photoUrl, age, gender, about } = feed;
    return (
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-lg">
          <figure>
            <img
              src={
                photoUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6fmlVq4miD1EDbbneFGhfZmqOKEODX5mwk14WnkqBoBcsclU99QVhpTGri8wpY1Mc-M&usqp=CAU"
              }
              alt="profileImage"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            <span>
              {age} {gender}
            </span>
            <p>{about}</p>
            <div className="card-actions justify-between mt-4">
              <button className="btn btn-primary">Ignore</button>{" "}
              <button className="btn btn-secondary ">Interested</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <div className="flex justify-center my-10"> */}
      {feedData && userCard(feedData[0])}
      {/* </div>{" "} */}
    </>
  );
};

export default Feed;
