import React from "react";

function WaitForRide(props) {
  return (
    <div>
      <h5
        className="absolute top-5 right-6 text-3xl  "
        onClick={() => {
          props.setWatingForDriver(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold  pl-3">Wating for driver</h3>

      <div className="flex justify-around items-center">
        <img
          className="h-[100px]"
          src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Omkar</h2>
          <h4 className="text-xl font-semibold -mt-2">Mp 04 AB 1234</h4>
          <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
        </div>
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
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-cash-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹ 156.45</h3>
              <p className="text-md font-medium  mt-1 text-gray-600">
                cash/pay online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitForRide;
