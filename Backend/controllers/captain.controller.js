const captainModel = require("../models/captain.model");
const captainservice = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { fullname, email, password, vehicle } = req.body;

  const iscaptainAlreadyExist = await captainModel.findOne({ email });

  if (iscaptainAlreadyExist) {
    return res.status(400).json({ message: "captain already existed" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainservice.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalide email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalide email or Password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token, captain });
};

module.exports.getcaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.captainLogout = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logged out" });
};
