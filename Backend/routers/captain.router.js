const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalide Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 charactors long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 charactors long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("car color must be atleast 3 charactors long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("car plate number must be atleast 3 charactors long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("car capacity must be atleast contain 1 person"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalide Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 charactors long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getcaptainProfile
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.captainLogout
);

module.exports = router;
