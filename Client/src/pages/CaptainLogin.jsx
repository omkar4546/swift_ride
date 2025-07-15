import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handlesubmmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    console.log(captainData);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;

      localStorage.setItem("token", data.token);

      setCaptain(data.captain);
      navigate("/captain-home");
    }
    setPassword("");
    setEmail("");
  };

  useEffect(() => {}, [email, password]);

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="">
        <img
          className="w-[100px] mx-auto mb-5"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VeVadKdZoA9lNJnyfFDDkqiIsehWiAF1WA&s"
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
            Join a fleet?
            <Link to={"/captain-signup"} className="text-blue-500 ">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div className="text-center ">
        <Link
          to="/login"
          className="bg-[#FEB81C] flex justify-center items-center   text-white font-semibold  rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-black"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
