"use client";
import { fetchUser } from "@/api_handlers/user";
import { addUser } from "@/lib/features/users/userSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((store: RootState) => store.user);

  //effects
  useEffect(() => {
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

    loadUserData();
  }, []);

  return <> This is feed component. </>;
};

export default Feed;
