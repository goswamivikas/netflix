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
      <div className="top mx-5 flex justify-between pt-7">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo h-6 sm:h-8 sm:w-[108px]"
        />
        <Link to="/login">
          <button
            onClick={() => console.log("sign in clicked")}
            className="loginButton semibold cursor-pointer rounded-sm border-none bg-[#E50914]  px-2 py-0.5 text-base sm:px-5 sm:py-1.5"
          >
            Sign In
          </button>
        </Link>
      </div>
      <div className="story-card-wrapper relative mx-auto  py-12 px-[5%] text-center text-white sm:px-12 sm:py-16">
        <div className="story-card xsm:py-8 relative mx-auto py-4 sm:py-20">
          <h1 className="mx-auto max-w-[640px] text-3xl font-semibold leading-none sm:text-[50px]">
            Unlimited movies, TV shows, and more
          </h1>
          <h2 className="my-4 mx-auto max-w-[640px] text-xl font-medium sm:text-2xl">
            Watch anywhere. Cancel anytime.
          </h2>

          {!email ? (
            <div className="email-wrapper mx-auto mt-2 flex  flex-col  items-center justify-center border-red-500">
              <h3 className="line- xsm:px-10 mx-auto max-w-[640px] px-4 text-base font-normal sm:px-12 sm:text-[18px] ">
                Ready to Watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className="email-form mx-auto mt-2 w-full sm:mx-10 sm:mt-4 lg:flex lg:w-[660px] lg:items-center lg:justify-center ">
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="email address"
                  className=" h-10 w-full max-w-[640px] rounded-sm px-2 text-black focus:border-indigo-500 focus:outline-none md:h-12 lg:w-auto lg:flex-grow "
                />
                <button
                  onClick={handleStart}
                  className="registerButton xsm:px-4 mx-auto mt-4 block cursor-pointer rounded-sm border-none bg-[#E50914] py-2 px-3 text-white md:h-12 lg:m-0 lg:w-3 lg:flex-grow"
                >
                  Get Started
                </button>
              </div>
            </div>
          ) : (
            <div className="email-wrapper mx-auto mt-2 flex  flex-col  items-center justify-center border-red-500">
              <form className="email-form mx-auto mt-2 w-full sm:mx-10 sm:mt-4 lg:flex lg:w-[660px] lg:items-center lg:justify-center ">
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="password"
                  className="h-10 w-full max-w-[640px] rounded-sm px-2 text-black focus:border-indigo-500 focus:outline-none md:h-12 lg:w-auto lg:flex-grow"
                />
                <button
                  onClick={handleFinish}
                  className="registerButton xsm:px-4 mx-auto mt-4 block cursor-pointer rounded-sm border-none bg-[#E50914] py-2 px-3 text-white md:h-12 lg:m-0 lg:w-3 lg:flex-grow"
                >
                  Start
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
