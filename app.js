var express = require("express");
var socket = require("socket.io");

//App setup
var PORT = 4000;
var app = express();
var server = app.listen(PORT, () => {
  console.log("You're listening to " + PORT);
});

//Static Files
app.use(express.static("public"));

//Socket setup
var io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection to ", socket.id);

  //   socket.on("chat", (data) => {      Testing what data is passed from socket in client side
  //     console.log(data);
  //   });

  //chat data listener from client side
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  //typing event listener from client side
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
