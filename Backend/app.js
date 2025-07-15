const dotenv = require("dotenv");
const express = require("express");
const connectToDb = require("./db/db");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const captainRouter = require("./routers/captain.router");
const mapsRouter = require("./routers/maps.router");
const rideRouter = require("./routers/ride.router");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/users", userRouter);
app.use("/api/captains/", captainRouter);
app.use("/api/maps/", mapsRouter);
app.use("/api/ride/", rideRouter);

module.exports = app;
