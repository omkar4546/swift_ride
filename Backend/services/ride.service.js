const rideModel = require("../models/rider.model");
const mapServices = require("./map.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  console.log("getFare called with:", { pickup, destination });

  if (!pickup || !destination) {
    throw new Error("pickup and destination is required");
  }

  try {
    console.log("About to call mapServices.getDistanceTime");
    const distanceTime = await mapServices.getDistanceTime(pickup, destination);
    console.log("distanceTime result:", distanceTime);

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
      throw new Error("Invalid distance/time data received");
    }

    console.log("Distance text:", distanceTime.distance.text);
    console.log("Duration text:", distanceTime.duration.text);

    const baseFare = {
      auto: 30,
      car: 50,
      motorcycle: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      motorcycle: 8,
    };

    const perMinutRate = {
      auto: 2,
      car: 3,
      motorcycle: 1.5,
    };

    // More robust parsing
    const distance = parseFloat(distanceTime.distance.text.split(" ")[0]);
    const duration = parseFloat(distanceTime.duration.text.split(" ")[0]);

    console.log("Parsed distance:", distance);
    console.log("Parsed duration:", duration);

    if (isNaN(distance) || isNaN(duration)) {
      throw new Error("Failed to parse distance or duration");
    }

    const fare = {
      auto:
        baseFare.auto +
        distance * perKmRate.auto +
        duration * perMinutRate.auto,
      car:
        baseFare.car + distance * perKmRate.car + duration * perMinutRate.car,
      motorcycle:
        baseFare.motorcycle +
        distance * perKmRate.motorcycle +
        duration * perMinutRate.motorcycle,
    };

    console.log("fare", fare);
    return fare;
  } catch (error) {
    console.log("error while get fare data", error);
    throw new Error("error while get fare data: " + error.message);
  }
}

module.exports.getFare = getFare;

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();

  return otp;
}

module.exports.createRide = async (
  userId,
  pickup,
  destination,
  vehicleType
) => {
  console.log("ok", pickup, destination, vehicleType);
  console.log("rider-service--->", userId, pickup, destination, vehicleType);
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("userId,pickup,destination or vehicleType needed");
  }

  try {
    const fare = await getFare(pickup, destination);
    console.log("fare=>", vehicleType, fare[vehicleType]);
    const ride = await rideModel.create({
      userId,
      pickup,
      destination,
      otp: getOtp(6),
      fare: fare[vehicleType],
    });
    console.log("ride", ride);
    return ride;
  } catch (error) {
    console.log("error while creating ride", error);
    throw new Error("error while creating ride", error.message);
  }
};
