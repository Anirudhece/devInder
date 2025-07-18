"use client";
import callLoginApi, { callSignUpApi } from "@/api_handlers/auth";
import { addUser } from "@/lib/features/users/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setpassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const renderFirstName = () => {
    if (isLoginForm) {
      return null;
    }
    return (
      <>
        <label className="input validator w-full my-2">
          <input
            value={firstName}
            onChange={handleFirstNameChange}
            required
            type="text"
            placeholder="First name"
          />
        </label>
        <div className="validator-hint hidden">First Name</div>
      </>
    );
  };

  const renderLastName = () => {
    if (isLoginForm) {
      return null;
    }
    return (
      <>
        <label className="input validator w-full my-2">
          <input
            value={lastName}
            onChange={handleLastNameChange}
            required
            type="text"
            placeholder="Last name"
          />
        </label>
        <div className="validator-hint hidden">Last Name</div>
      </>
    );
  };

  const emailField = () => {
    return (
      <>
        <label className="input validator w-full my-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            value={emailId}
            onChange={handleEmailChange}
            type="email"
            placeholder="mail@site.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
      </>
    );
  };

  const passwordField = () => {
    return (
      <div className="w-full my-2">
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            value={password}
            onChange={handlePasswordChange}
            className="w-full"
            type="password"
            required
            placeholder="Password"
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
      </div>
    );
  };

  const handleLoginOrSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    const handleLogin = async () => {
      if (!emailId || !password) {
        return;
      }
      const loginData = await callLoginApi(emailId, password);
      if (!loginData?.user) {
        setLoginError(loginData?.err ?? "");
        return;
      }
      dispatch(addUser(loginData?.user));
      router.push("/");
    };

    const handleSingUp = async () => {
      if (!emailId || !password || !firstName || !lastName) {
        return;
      }
      const signUpData = await callSignUpApi(
        emailId,
        password,
        firstName,
        lastName
      );

      console.log(`signUpData : `,signUpData)
      dispatch(addUser(signUpData?.data));
      router.push("/profile");
    };

    e.preventDefault();

    if (isLoginForm) {
      await handleLogin();
    } else {
      await handleSingUp();
    }
  };

  const renderLoginError = () => {
    if (!loginError) {
      return null;
    }
    return (
      <div role="alert" className="alert alert-error alert-soft">
        <span>{loginError}</span>
      </div>
    );
  };

  const renderLoginButton = () => {
    if (!isLoginForm) {
      return;
    }
    return (
      <button type="submit" className="btn w-1/2 btn-primary mt-2">
        Log In
      </button>
    );
  };

  const renderSignUpButton = () => {
    if (isLoginForm) {
      return;
    }
    return (
      <button type="submit" className="btn w-1/2 btn-primary mt-2">
        Sign Up
      </button>
    );
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-120 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center mb-2">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleLoginOrSignUp}>
              {renderFirstName()}
              {renderLastName()}
              {emailField()}
              {passwordField()}
              {renderLoginError()}
              <div className="card-actions justify-center">
                {renderLoginButton()}
                {renderSignUpButton()}
              </div>
              <p
                onClick={() => {
                  setIsLoginForm((prev) => !prev);
                }}
                className="mt-8 decoration-sky-500 cursor-pointer"
              >
                {isLoginForm
                  ? "New User? SignUp here."
                  : "Existing User? SignIn here."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
