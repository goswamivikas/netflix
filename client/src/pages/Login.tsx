import React, { SyntheticEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Login = ({ setUser }: { setUser: Function }) => {
  // const [email, setEmail] = React.useState<string>("");
  // const [password, setPassword] = React.useState<string>("");

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!emailRef?.current?.value) {
      alert("please provide an email or phone number!");
      return;
    }
    if (!passwordRef?.current?.value) {
      alert("please provide password!");
      return;
    }

    const res = await axios.post(
      "api/auth/login",
      {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    setUser(res.data);
  };

  return (
    <div className="login md:bg-netflix-background relative min-h-screen overflow-hidden bg-black bg-cover text-white">
      <div className="top flex items-center justify-between px-[4%] pt-4 pb-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo h-12 md:h-10 "
        />
      </div>
      <div className="containerrr mx-auto h-full w-full flex-col px-8 text-center text-white">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="mx-auto flex h-[660px] flex-col gap-10  rounded  bg-[rgba(0,0,0,.75)] md:w-[450px] md:py-16 md:px-16"
        >
          <h1 className="align self-start text-4xl font-bold ">Sign In</h1>
          <input
            type="email"
            placeholder="Email or Phone number"
            autoComplete="off"
            ref={emailRef}
            className="h-12 rounded bg-[rgb(51,51,51)] px-5 py-4 placeholder:text-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            ref={passwordRef}
            className="h-12 rounded bg-[rgb(51,51,51)] px-5 py-4 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="loginButton h-10 rounded bg-[#E50914]"
          >
            Sign In
          </button>
          <span className="self-start text-[#8c8c8c] ">
            New to Netflix?{" "}
            <Link to="/register">
              <span className="text-white">Sign up now.</span>
            </Link>
          </span>
          <small className="max-w-xs self-start text-left text-[#8c8c8c]">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <span className="text-blue-700">Learn more.</span>
          </small>
        </form>
      </div>
    </div>
  );
};
