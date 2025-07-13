"use client";
import { fetchUser } from "@/api_handlers/profile";
import { callFeedApi } from "@/api_handlers/users";
import { addfeed } from "@/lib/features/feeds/feedSlice";
import { addUser } from "@/lib/features/users/userSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./ui/user-card";

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

  const renderUsers = () => {
    if (!feedData?.length) {
      return null;
    }
    return feedData.map((user, ind: number) => (
      <UserCard key={ind} feed={user} />
    ));
  };

  return (
    <>
      <div className="flex justify-center my-10">
        {/* {feedData && <UserCard feed={feedData[0]} />} */}
        <div className="space-y-4">{renderUsers()}</div>
      </div>
    </>
  );
};

export default Feed;
