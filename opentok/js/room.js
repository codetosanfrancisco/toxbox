var apiKey, sessionId, token, session;

var SERVER_BASE_URL = `https://paul-opentok.herokuapp.com/room`;
axios
  .post(SERVER_BASE_URL, {
    roomId: getParameterByName("roomId")
  })
  .then(function(res) {
    console.log(res);
    apiKey = res.data.sessionData.ot.apiKey;
    sessionId = res.data.sessionData.sessionId;
    token = res.data.tokenData;
    initializeSession(apiKey, sessionId);
  })
  .catch(handleError);

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initializeSession(apiKey, sessionId) {
  session = OT.initSession(apiKey, sessionId);
  // Subscribe to a newly created stream
  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%"
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  session.on("streamCreated", function(event) {
    console.log("Stream created!");
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%"
      },
      handleError
    );
  });
}
