let mongoose = require("mongoose");

let sessionSchema = new mongoose.Schema({
  sessionData: mongoose.Mixed,
  tokenData: String
});

module.exports = mongoose.model("Session", sessionSchema);
