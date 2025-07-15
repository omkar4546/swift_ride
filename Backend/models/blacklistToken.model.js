const mongoose = require("mongoose");

const blacklistToken = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistToken);
