import React from "react";

function VehicalPanel({
  fare,
  setVehicleType,
  setConfirmRidePanel,
  setVehiclePanel,
  setVehicleFound,
}) {
  return (
    <div>
      <h5
        className="absolute top-7 right-6 text-3xl  "
        onClick={() => {
          setVehiclePanel(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={(e) => {
          setConfirmRidePanel(true);
          setVehicleType("car");
        }}
        className="flex w-full p-3 border-[3px] border-solid mb-1 active:border-black bg-gray-100 rounded-xl items-center justify-between gap-2"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-fill">4</i>
            </span>
          </h4>

          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare?.car}</h2>
      </div>
      <div
        onClick={(e) => {
          setConfirmRidePanel(true);
          setVehicleType("car");
        }}
        className="flex w-full p-3 border-[3px] border-solid mb-1 active:border-black bg-gray-100 rounded-xl items-center justify-between gap-2"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-fill">4</i>
            </span>
          </h4>

          <h5 className="font-medium text-sm">5 min away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare?.car + 200}</h2>
      </div>
      <div
        onClick={(e) => {
          setConfirmRidePanel(true);
          setVehicleType("auto");
        }}
        className="flex w-full p-3 border-[3px] border-solid mb-1 active:border-black bg-gray-100 rounded-xl items-center justify-between gap-2"
      >
        <img
          className="h-12 w-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-fill"></i> 2
            </span>
          </h4>

          <h5 className="font-medium text-sm">1 min away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare?.auto}</h2>
      </div>
      <div
        onClick={(e) => {
          setConfirmRidePanel(true);
          setVehicleType("motorcycle");
        }}
        className="flex w-full p-3 border-[3px] border-solid mb-1 active:border-black bg-gray-100 rounded-xl items-center justify-between gap-2"
      >
        <img
          className="h-12 w-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Uber Go{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>

          <h5 className="font-medium text-sm">1 min away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{fare?.motorcycle}</h2>
      </div>
    </div>
  );
}

export default VehicalPanel;
