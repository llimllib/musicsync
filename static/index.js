document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("wall"),
    ctx = canvas.getContext("2d"),
    images = {},
    width = 1024,
    height = 768,
    speed = {
      1: 100,
      2: 50,
      3: 10,
      4: 3,
      5: 1
    };


  const proto = document.location.protocol.match(/(.):/)[1] == "s"
    ? "wss"
    : "ws",
    conn = new WebSocket(`${proto}://${document.location.host}/ws`);
  conn.onclose = function(evt) {
    console.log("closing websocket connection");
  };
  conn.onmessage = function(evt) {
    console.log("got evt", evt);
    if (evt.data.startsWith("PLAY ")) {
      audio = document.getElementById("player");
      console.log(audio);
      audio.src=evt.data.split(" ")[1];
      console.log(audio.src);
      audio.play();
    }
  };
  conn.onerror = function(err) {
    console.error("ERROR: ", err);
  };
});
