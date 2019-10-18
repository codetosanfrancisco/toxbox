var apiKey, sessionId, token, session;

var SERVER_BASE_URL = "http://localhost:3000/session/new";
axios
  .get(SERVER_BASE_URL)
  .then(function(res) {
    console.log(res);
    apiKey = res.data.sessionData.ot.apiKey;
    sessionId =
      "2_MX40NjQ0MDE3Mn5-MTU3MTQxNzg4NTE4OH51TWdLYWNaVVRpeW5XTEllN3BpSi9nUlR-fg";
    token =
      "T1==cGFydG5lcl9pZD00NjQ0MDE3MiZzaWc9ZmZiY2Q4NGFjYWY5YzY1ZmIxNzFlNWY2OGE1ZWZjNWEzZjZhOGQxNjpzZXNzaW9uX2lkPTJfTVg0ME5qUTBNREUzTW41LU1UVTNNVFF4TnpnNE5URTRPSDUxVFdkTFlXTmFWVlJwZVc1WFRFbGxOM0JwU2k5blVsUi1mZyZjcmVhdGVfdGltZT0xNTcxNDE3ODg1Jm5vbmNlPTAuNTgxMzkwODIwMjEzNjU5NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTcyMDIyNjg1JmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNESm9obm55JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9Zm9jdXMlMjBpbmFjdGl2ZQ==";
    initializeSession(apiKey, sessionId);
  })
  .catch(handleError);

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
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
