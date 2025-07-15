const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log("Validation errors:", error.array());
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { pickup, destination, vehicleType } = req.body;
    console.log("data", pickup, destination, vehicleType);
    const ride = await rideService.createRide(
      req.user._id,
      pickup,
      destination,
      vehicleType
    );
    console.log("ride", ride);
    return res.status(201).json(ride);
  } catch (error) {
    console.log("error while creating ride", error);
    throw new Error("error while creating ride", error.message);
  }
};

module.exports.getFare = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { pickup, destination } = req.query;
    console.log("pickup, destination", pickup, destination);
    const pricing = await rideService.getFare(pickup, destination);
    console.log("pricing", pricing);
    return res.status(200).json(pricing);
  } catch (error) {}
};
