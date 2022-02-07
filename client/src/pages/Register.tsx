import React from "react";

export const Register: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleStart = () => {
    emailRef && emailRef.current && setEmail(emailRef.current.value);
  };
  const handleFinish = () => {
    passwordRef &&
      passwordRef.current &&
      setPassword(passwordRef.current.value);
  };
  return (
    <div className=" register bg-netflix-background relative h-screen w-screen bg-cover text-white">
      <div className="top flex items-center justify-between py-5 px-12">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo h-10 "
        />
        <button className="loginButton semibold rounded-sm border-none bg-[#E50914] py-1 px-4 text-base">
          Sign IN
        </button>
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
