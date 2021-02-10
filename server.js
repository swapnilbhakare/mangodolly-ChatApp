require("dotenv").config();

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(http);

// Template engin

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
