var apiKey = "46440172",
  apiSecret = "60d8dec65a8d1e7923edb27d4f6f858b167edfaf";

var OpenTok = require("opentok");
var opentok = new OpenTok(apiKey, apiSecret);

module.exports = opentok;
