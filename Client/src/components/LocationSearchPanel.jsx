import React from "react";

function LocationSearchPanel(props) {
  console.log(props);
  const {
    suggestions,
    setVehiclePanel,
    setPanelOpen,
    setPickup,
    setDestination,
    activeField,
  } = props;

  const handleSuggestions = (suggestions) => {
    if (activeField === "pickup") {
      console.log("object", suggestions);
      setPickup(suggestions);
    } else {
      console.log("object", suggestions);
      setDestination(suggestions);
    }
  };
  // const location = [
  //   "24, 2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi",
  //   "12, Ground Floor, Rajdeep Apartments, Tilak Marg, Dadar East",
  //   "45, 3rd Floor, Galaxy Residency, Bhandarkar Road, Matunga",
  //   "89, Flat No. 6B, Omkar Heights, LBS Road, Ghatkopar West",
  //   "3, Ground Floor, Triveni Sadan, Jawahar Nagar, Goregaon West",
  //   "77, 1st Floor, Mehta Chambers, Napean Sea Road, Malabar Hill",
  //   "16, B-Wing, Gokul Complex, S.V. Road, Andheri West",
  //   "59, 4th Floor, Pearl Plaza, MG Road, Vile Parle East",
  //   "102, Ground Floor, Krishna Nivas, Sion Trombay Road, Chembur",
  //   "32, 2nd Floor, Sai Darshan Tower, Parel Tank Road, Parel",
  // ];

  return (
    <div>
      {suggestions.map((address, index) => (
        <div
          // onClick={() => {

          //   setVehiclePanel(true);
          //   setPanelOpen(false);
          // }}
          onClick={() => handleSuggestions(address)}
          key={index}
          className="flex border-white active:border-black gap-4 border-2 p-3 rounded-xl justify-start items-center mb-2"
        >
          <h2 className="bg-[#eee] p-2 h-10 w-12 flex justify-center items-center  rounded-full">
            <i className="ri-map-pin-user-fill"></i>
          </h2>
          <h4 className="font-medium">{address}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;

{
  /* 
      <div className="flex border-white active:border-black gap-4 border-2 p-3 rounded-xl justify-start items-center my-2">
        <h2 className="bg-[#eee] p-2 h-10 w-12 flex justify-center items-center  rounded-full">
          <i class="ri-map-pin-user-fill"></i>
        </h2>
        <h4 className="font-medium">
          24,2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi
        </h4>
      </div>
      <div className="flex border-white active:border-black gap-4 border-2 p-3 rounded-xl  justify-start items-center my-2">
        <h2 className="bg-[#eee] p-2 h-10 w-12 flex justify-center items-center  rounded-full">
          <i class="ri-map-pin-user-fill"></i>
        </h2>
        <h4 className="font-medium">
          24,2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi
        </h4>
      </div>
      <div className="flex border-white active:border-black gap-4 border-2 p-3 rounded-xl  justify-start items-center my-2">
        <h2 className="bg-[#eee] p-2 h-10 w-12 flex justify-center items-center  rounded-full">
          <i class="ri-map-pin-user-fill"></i>
        </h2>
        <h4 className="font-medium">
          24,2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi
        </h4>
      </div>
      <div className="flex border-white active:border-black gap-4 border-2 p-3 rounded-xl  justify-start items-center my-2">
        <h2 className="bg-[#eee] p-2 h-10 w-12 flex justify-center items-center  rounded-full">
          <i class="ri-map-pin-user-fill"></i>
        </h2>
        <h4 className="font-medium">
          24,2nd Floor, 51, Shreeji Bhavan, Mangaldas Road, Kalbadevi
        </h4>
      </div> */
}
