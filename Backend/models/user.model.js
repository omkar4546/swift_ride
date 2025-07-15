const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
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
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  sockedId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
