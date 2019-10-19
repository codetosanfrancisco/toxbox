const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const opentok = require("./opentok/opentok");
const Session = require("./mongodb/models/session");
require("./mongodb/database");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/room/new", (req, res) => {
  return opentok.createSession({ mediaMode: "routed" }, function(err, session) {
    if (err) throw new Error("Fail to create a session.");

    var token = session.generateToken({
      expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // in one week
      data: "name=Johnny",
      initialLayoutClassList: ["focus", "inactive"]
    });

    const mongoSession = new Session({
      sessionData: session,
      tokenData: token
    });

    mongoSession.save().then(response => {
      console.log("Everything is saved!");
      return res.status(200).send(response);
    });
  });
});

app.post("/room", async (req, res) => {
  var roomId = req.body.roomId;
  var data = await Session.findById(roomId);
  return res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
