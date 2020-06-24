var socket = io.connect("http://localhost:4000/");

// Query DOM
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

//emit events

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

//Listen on keyboard typing event
message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//Listen for events from backend
socket.on("chat", (data) => {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

//Listen to typing message
socket.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message... </p></em>";
});
