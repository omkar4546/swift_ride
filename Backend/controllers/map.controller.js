const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");

module.exports.getCoordinates = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "coordiante not found" });
    console.log("error in geting coordinates", error);
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error, "called");
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { origin, destination } = req.query;
    console.log(origin, destination);

    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.log("Error in getting distance time", error);
    res.status(404).json({ message: "distance time not found" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { input } = req.query;
    console.log(input);

    const sugessions = await mapService.getAutoCompleteSuggestions(input);
    return res.status(200).json(sugessions);
  } catch (error) {
    console.log("Error in getting suggestions", error);
    res.status(404).json({ message: "Suggestions is not found" });
  }
};
