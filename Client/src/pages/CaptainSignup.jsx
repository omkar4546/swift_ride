import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [userData, setUserData] = useState({});
  const [fullame, setFullname] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handlesubmmit = async (e) => {
    e.preventDefault();
    const newcaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    console.log(newcaptain);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newcaptain
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.user);
      navigate("/captain-login");
    }

    setPassword("");
    setEmail("");
    setFirstname("");
    setLastname("");
    setVehicleType("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
  };

  useEffect(() => {}, [email, password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-white rounded-t-2xl px-8 pt-8 pb-6 shadow-xl">
          <div className="text-center mb-8">
            <img
              className="w-[100px] h-auto mx-auto mb-6"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9VeVadKdZoA9lNJnyfFDDkqiIsehWiAF1WA&s"
              alt="Uber Logo"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Join as Captain
            </h1>
            <p className="text-gray-600 text-sm">Create your driver account</p>
          </div>

          <form onSubmit={handlesubmmit} className="space-y-6">
            {/* Name Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    name="firstname"
                    placeholder="First name"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    name="lastname"
                    placeholder="Last name"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="your.email@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Password Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Vehicle Information Section */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Vehicle Information
              </h3>

              <div className="space-y-4">
                {/* Vehicle Color & Plate - Side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      name="vehicleColor"
                      placeholder="Color"
                      onChange={(e) => setVehicleColor(e.target.value)}
                      value={vehicleColor}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      name="vehiclePlate"
                      placeholder="Plate Number"
                      onChange={(e) => setVehiclePlate(e.target.value)}
                      value={vehiclePlate}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Capacity & Type - Side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      required
                      name="vehicleCapacity"
                      placeholder="Capacity"
                      min="1"
                      max="8"
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                      value={vehicleCapacity}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <select
                      required
                      name="vehicleType"
                      onChange={(e) => setVehicleType(e.target.value)}
                      value={vehicleType || "car"}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    >
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 text-sm"
            >
              Create Captain Account
            </button>
          </form>
        </div>

        {/* Footer Section */}
        <div className="bg-white rounded-b-2xl px-8 py-6 shadow-xl border-t border-gray-100">
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Already have a captain account?{" "}
              <Link
                to="/captain-login"
                className="text-blue-700 font-semibold hover:underline transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full bg-[#FEB81C] text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all duration-200 text-sm text-center block"
            >
              Sign in as user
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignup;
