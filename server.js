const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const { Server } = require("socket.io");

// Create a server and pass it to socket.io
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat", (data) => {
    io.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000!");
});
