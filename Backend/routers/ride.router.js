const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.post(
  "/create-ride",
  // body("userId")
  //   .isString()
  //   .isLength({ min: 24, max: 24 })
  //   .withMessage("Invalide user ID"),
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalide pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalide destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalide vehicleType"),
  authMiddleware.authUser,
  rideController.createRide
);

router.get(
  "/get-fare",
  query("pickup").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  rideController.getFare
);

module.exports = router;
