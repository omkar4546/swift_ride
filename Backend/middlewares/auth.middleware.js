const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  const isBlackList = await blacklistTokenModel.findOne({ token: token });

  if (isBlackList) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    console.log(user);
    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorize" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  const isBlackList = await blacklistTokenModel.findOne({ token: token });

  if (isBlackList) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    console.log(captain);
    req.captain = captain;
    console.log("logout");
    return next();
  } catch (error) {
    console.log(error);
    console.log("logout errors");
    return res.status(401).json({ message: "Unauthorize" });
  }
};
