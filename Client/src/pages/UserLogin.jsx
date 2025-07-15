import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { userDataContext } from "../context/userContext";

import axios from "axios";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(userDataContext);

  const navigate = useNavigate();

  const handlesubmmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      newUser
    );

    if (response.status == 201) {
      const data = response.data;

      localStorage.setItem("token", data.token);

      setUser(data.user);
      navigate("/home");
    }
    setPassword("");
    setEmail("");
  };

  useEffect(() => {}, [email, password]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="">
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            handlesubmmit(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            required
            name="email"
            placeholder="email@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="bg-[#EEEEEE] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-black"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="bg-[#EEEEEE] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-black"
          />

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-black">
            Login
          </button>
          <p className="flex justify-center items-center">
            New here?
            <Link to={"/signup"} className="text-blue-500 ">
              Create Account
            </Link>
          </p>
        </form>
      </div>
      <div className="text-center ">
        <Link
          to="/captain-login"
          className="bg-green-500 flex justify-center items-center   text-white font-semibold  rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-black"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
