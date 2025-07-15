import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainsDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    console.log("captain", captain);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3g_8MsEZOREYSmEPJCXgCDFTzA_inJFJUGg&s"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div className="">
          <h4 className="text-xl font-semibold">₹ 546</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-6 bg-[#FFD264] rounded-xl justify-center items-start gap-5 border-4 border-[]">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-flash-fill"></i>
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-md font-semibold">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-md font-semibold">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-fill"></i>
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-md font-semibold">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainsDetails;
