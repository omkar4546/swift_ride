import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUP = ({ setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
  const [otp, setotp] = useState("");

  return (
    <div className="">
      <h5
        className="absolute top-5 right-6 text-3xl"
        onClick={() => {
          setRidePopUpPanel(true);
          setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold  pl-3">
        New Ride Avaliable! confi
      </h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-14 w-12 rounded-full object-cover "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyLk19ewvSkomtmVujlu7DWNjoxTCoVPpM2n2MuTBz-OUzsqyoo3ulVUqKfSMymmWQKE&usqp=CAU"
            alt=""
          />
          <h2 className="text-lg font-medium">Naruto Uzumaki</h2>
        </div>
        <h5 className="text-lg font-semibold">3.6 km</h5>
      </div>
      <div className="flex gap-2 flex-col justify-between items-center ">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-user-location-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">
                24, 2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-2-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm mt-1 text-gray-600">
                24, 2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  mb-3">
            <i className="text-lg ri-cash-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹ 156.45</h3>
              <p className="text-md font-medium  mt-1 text-gray-600">
                cash/pay online
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form action="" onSubmit={(e) => Submithandler(e)}>
            <input
              type="number"
              placeholder="Enter OTP"
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 "
              value={otp}
              onChange={(e) => setotp(e.target.value)}
            />
            <Link
              to={"/captain-riding"}
              // onClick={(e) => {
              //   setRidePopUpPanel(false);
              //   setConfirmRidePopUpPanel(false);
              // }}
              className="w-full bg-green-600 rounded text-white font-semibold flex justify-center items-center px-6 py-2 mt-4 mb-2"
            >
              Confirm Ride
            </Link>
            <button
              onClick={(e) => {
                setRidePopUpPanel(true);
                setConfirmRidePopUpPanel(false);
                console.log("called");
              }}
              className="w-full bg-red-500 rounded text-white font-semibold flex justify-center items-center py-2 mt-4"
            >
              Cancle Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUP;
