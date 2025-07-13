"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { User } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { callLogoutApi } from "@/api_handlers/auth";
import { removeUser } from "@/lib/features/users/userSlice";

const Navbar = () => {
  const user: User | any = useSelector((store: RootState) => store.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await callLogoutApi();
    dispatch(removeUser());
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Dev Tinder 👨🏻‍💻
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={String(user?.photoUrl)}
                />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link href="/profile" className="justify-between">Profile</Link></li>
            <li><Link href="/connections">Connections</Link></li>
            <li><Link href="/requests">Requests</Link></li>
            <li><span onClick={handleLogout}>Logout</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
