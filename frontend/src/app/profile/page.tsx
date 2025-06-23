"use client";
import { profileEdit } from "@/api_handlers/profile";
import UserCard from "@/components/ui/user-card";
import { addUser } from "@/lib/features/users/userSlice";
import { RootState } from "@/lib/store";
import { User } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const router = useRouter();
  const userData: User = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [age, setAge] = useState<number | string>(userData?.age || "");
  const [gender, setGender] = useState(
    userData?.gender || "Select your gender"
  );
  const [about, setAbout] = useState(userData?.about || "");
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl || "");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedInfo = {
      firstName,
      lastName,
      age: String(age),
      photoUrl,
      gender,
      about,
    };

    const updatedUserData = await profileEdit(updatedInfo);
    if (!updatedUserData) {
      setApiError(true);
      return;
    }
    dispatch(addUser(updatedUserData));
    router.push("/");
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(e.target.value);
  };

  const renderForm = () => {
    return (
      <div className="card bg-base-300 w-120 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center mb-2">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="my-1" id="firstName">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input w-full validator"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>

            <div className="my-1" id="lastName">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input w-full validator"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>

            <div className="my-1" id="photuUrl">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="url"
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                title="Must be valid URL"
                className="input w-full validator"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={handlePhotoUrlChange}
              />
            </div>

            <div className="my-1" id="age">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                title="only numbers are allowed"
                className="input w-full validator"
                placeholder="Age"
                value={age}
                onChange={handleAgeChange}
              />
            </div>

            <div className="my-1" id="gender">
              <legend className="fieldset-legend">Gender</legend>
              <select
                value={gender}
                onChange={handleGenderChange}
                className="select w-full validator"
              >
                <option disabled={true}>Select your gender</option>
                <option>male</option>
                <option>female</option>
                <option>others</option>
              </select>
            </div>

            <div className="my-1" id="about">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea w-full validator"
                placeholder="About"
                value={about}
                onChange={handleAboutChange}
              />
            </div>

            {apiError && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Something went wrong.</span>
              </div>
            )}

            <div className="card-actions justify-center">
              <button type="submit" className="btn w-1/2 btn-primary mt-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!userData) {
      router.push("/login");
    }
  }, [userData]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly my-2 items-center lg:items-start">
        <div className="mb-4 lg:mb-0">{renderForm()}</div>
        <div className="flex items-center">
          <UserCard
            feed={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </>
  );
}
