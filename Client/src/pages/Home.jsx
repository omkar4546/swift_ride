import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConfirmedVehicle from "../components/ConfirmedVehicle";
import WaitForRide from "../components/WaitForRide";
import LookingForDriver from "../components/LookingForDriver";
import axios from "axios";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [watingForDriver, setWatingForDriver] = useState(false);

  //debouncing
  const [debounceTimer, setDebounceTimer] = useState(null);

  //use for gsap effect
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WatingForDriverRef = useRef(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(pickup, destination);
  };

  useGSAP(
    function () {
      if (watingForDriver) {
        gsap.to(WatingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WatingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [watingForDriver]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      console.log(panelOpen);
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(async () => {
      if (e.target.value.length < 3) {
        setPickupSuggestions([]);
        return;
      }

      try {
        const sugession = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions/`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(sugession.data);
      } catch (error) {
        console.log("error in handling PickupChange", error);
        setPickupSuggestions([]);
      }
    }, 800);

    setDebounceTimer(newTimer);
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(async () => {
      if (e.target.value.length < 3) {
        setDestinationSuggestions([]);
        return;
      }

      try {
        const sugession = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions/`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("setDestinationSuggestions", sugession?.data);
        setDestinationSuggestions(sugession.data);
      } catch (error) {
        console.log("error in handling Destination Change", error);
        setPickupSuggestions([]);
      }
    }, 800);
  };

  async function findTrip() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(response.data);
      setVehiclePanel(true);
      setPanelOpen(false);
    } catch (error) {
      console.log("Error in getting fare", error);
    }
  }

  async function createRide() {
    console.log("localStorage.getItem", localStorage.getItem("token"));
    console.log("Data being sent:", { pickup, destination, vehicleType });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create-ride`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log("error while creatingRide", error);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className=" w-16 fixed left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div onClick={() => setVehiclePanel(false)} className="h-screen w-screen">
        {/* image for temporary */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className=" h-screen absolute top-0  w-full flex flex-col justify-end">
        <div className="h-[40%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            className="absolute top-3 right-6 text-3xl opacity-0 "
            onClick={() => {
              setPanelOpen(false);
            }}
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold ">Find a trip</h4>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="line absolute h-20 w-1  bg-gray-700 rounded-full top-[30%] left-10"></div>
            <input
              className="bg-[#e1dcdc] px-12 py-2 text-lg rounded-lg w-full mt-5 "
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onClick={() => {
                setPanelOpen(true);

                setActiveField("pickup");
              }}
              onChange={handlePickupChange}
            />
            <input
              className="bg-[#e1dcdc] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter yout destination"
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onChange={handleDestinationChange}
            />
            <button
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg mt-5 w-full"
            >
              Find Trip
            </button>
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className={`fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 ${
            pickup & (destination == null) ? "hidden" : ""
          }`}
        >
          <VehicalPanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
            fare={fare}
            setVehicleType={setVehicleType}
          />
        </div>
        <div
          ref={confirmRidePanelRef}
          className={`fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 ${
            vehicleType == null ? "hidden" : ""
          } `}
        >
          <ConfirmedVehicle
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className={`fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-6 translate-y-full ${
            !vehicleFound ? "hidden" : ""
          }`}
        >
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>
        {/* <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-6 translate-y-full"
        >
          <LookingForDriver
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div> */}
        <div
          ref={WatingForDriverRef}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-6 "
        >
          <WaitForRide setWatingForDriver={setWatingForDriver} />
        </div>
      </div>
    </div>
  );
}

export default Home;
