require("dotenv").config();

var apiKey = process.env.OPENTOK_APIKEY,
  apiSecret = process.env.OPENTOK_APISECRET;

var OpenTok = require("opentok");
var opentok = new OpenTok(apiKey, apiSecret);

module.exports = opentok;
