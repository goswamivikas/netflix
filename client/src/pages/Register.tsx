import axios from "axios";
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

export const Register: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  // const [password, setPassword] = React.useState<string>("");
  const { setUser } = React.useContext(UserContext);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleStart = () => {
    setEmail(emailRef?.current?.value || "");
  };
  const handleFinish = async (e: SyntheticEvent) => {
    e.preventDefault();
    // setPassword(passwordRef?.current?.value || "");
    console.log("handle finsih");
    try {
      const res = await axios.post("api/auth/register", {
        email: email,
        password: passwordRef?.current?.value,
      });
      // console.log({ reguser: res.data });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" register bg-netflix-background relative h-screen w-screen bg-cover text-white">
      <div className="top relative z-[1] flex items-center justify-between py-5 px-12">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo h-10 "
        />
        <Link to="/login">
          <button
            onClick={() => console.log("sign in clicked")}
            className="loginButton semibold cursor-pointer rounded-sm border-none bg-[#E50914] py-1 px-4 text-base"
          >
            Sign IN
          </button>
        </Link>
      </div>
      <div className="containerrr absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-[48px] ">
          Unlimited movies, Tv
          <br /> Shows, and more
        </h1>
        <h2 className="my-5 text-[28px]">Watch anywhere. Cancel Anytime</h2>
        <p className="text-xl">
          Ready to Watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input mt-5 flex h-12 w-1/2 items-center justify-between bg-white ">
            <input
              type="email"
              ref={emailRef}
              placeholder="email address"
              className="h-full flex-[9] border  px-2 text-black focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={handleStart}
              className="registerButton h-full flex-[3] cursor-pointer border-none bg-[#E50914] text-xl text-white"
            >
              Get Started
            </button>
          </div>
        ) : (
          <form className="input mt-5 flex h-12 w-1/2 items-center justify-between bg-white">
            <input
              type="password"
              ref={passwordRef}
              placeholder="password"
              className="h-full flex-[9] border px-2 text-black focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={handleFinish}
              className="registerButton h-full flex-[3] cursor-pointer border-none bg-[#E50914] text-xl text-white"
            >
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
