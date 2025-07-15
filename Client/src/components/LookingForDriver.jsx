import React from "react";

function LookingForDriver({
  createRide,
  pickup,
  destination,
  fare,
  vehicleType,
  setVehicleFound,
}) {
  return (
    <div>
      <h5
        className="absolute top-5 right-6 text-3xl  "
        onClick={() => {
          setVehicleFound(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold  pl-3">Looking for a Rider</h3>
      <div className="flex gap-2 flex-col justify-between items-center ">
        <img
          className="h-[150px]"
          src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png"
          alt=""
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-user-location-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm mt-1 text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-2-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  mb-3">
            <i className="text-lg ri-cash-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{`${fare[vehicleType]}`}</h3>
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

export default LookingForDriver;
