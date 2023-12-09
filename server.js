const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
const Db = require("./Database/Db");
const bodyparser = require("body-parser");
const Routes = require("./Routes/AdminRoutes");
const { Socket } = require("dgram");
dotenv.config({ path: "Config/.env" });
Db();
const port = process.env.port;

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIO(server);
const users = [{}];
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joined", ({ User }) => {
    // const socket.id=socket.id
    users[socket.id] = User.UserName;

    console.log(users[socket.id], "is join");
    console.log("users:", users);
  });

  socket.emit("wellcome", { user: "Admin", message: "welcome to the chat" });

  socket.broadcast.emit("userJoin", {
    user: "Admin",
    message: `${users[socket.id]} has join`,
  });
  socket.on("message", ({ id, message }) => {
    io.emit("sendmessage", { user: users[id], message, id });
  });
  socket.on("disconnected", () => {
    socket.broadcast.emit("Leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
    console.log("user leave");
  });
});
app.use("/api", Routes);
server.listen(port, () => {
  console.log("server is working on 5000");
});
