import React, { SyntheticEvent } from "react";
import axios from "axios";

export const Login = ({ setUser }: { setUser: Function }) => {
  // const [email, setEmail] = React.useState<string>("");
  // const [password, setPassword] = React.useState<string>("");

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    });
    if (!emailRef?.current?.value) {
      alert("please provide an email or phone number!");
      return;
    }
    if (!passwordRef?.current?.value) {
      alert("please provide password!");
      return;
    }

    const res = await axios.post(
      "auth/login",
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
    <div className="login bg-netflix-background relative h-screen w-screen bg-cover text-white">
      <div className="top flex items-center justify-between py-5 px-12">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo h-10 "
        />
      </div>
      <div className="containerrr absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center text-center text-white">
        <form
          onSubmit={handleSubmit}
          className="flex h-[660px] w-[450px] flex-col justify-around  rounded bg-[rgba(0,0,0,.75)] py-16 px-16"
        >
          <h1 className="align self-start text-3xl font-bold ">Sign In</h1>
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
            ref={passwordRef}
            className="h-12 rounded bg-[rgb(51,51,51)] px-5 py-4 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="loginButton h-10 rounded bg-[#E50914]"
          >
            Sign In
          </button>
          <span className="text-gray-400">
            New to Netflix? <b className="text-white">Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};
