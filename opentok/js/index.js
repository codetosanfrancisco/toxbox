var SERVER_BASE_URL = "https://paul-opentok-server.herokuapp.com/room/new";

$("#createSession").click(function() {
  createSession();
});

//Create a session
function createSession() {
  axios
    .get(SERVER_BASE_URL)
    .then(function(res) {
      displayRoomId(res.data._id);
    })
    .catch(handleError);
}

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// Show the room id
function displayRoomId(roomId) {
  var url =
    "https://paul-opentok.s3-ap-southeast-1.amazonaws.com/room.html" +
    `?roomId=${roomId}`;
  $("#roomId").text(url);
  $("#roomId").attr("href", url);
}
