const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "first name at least 3 characters"],
    },
    lastname: {
      type: String,
      minLength: [3, "last name at least 3 characters"],
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    minLength: [5, "Email name at least 5 characters"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  sockedId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      require: true,
      minLength: [3, "colour at least 3 characters"],
    },
    plate: {
      type: String,
      require: true,
      minLength: [3, "plate name at least 3 characters"],
    },
    capacity: {
      type: Number,
      require: true,
      minLength: [1, "Capacity at least 3 characters"],
    },
    vehicleType: {
      type: String,
      require: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
