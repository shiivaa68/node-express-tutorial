const express = require("express");
const lessonsRouter = require("../Routers/lessons-routes");
const messagesRouter = require("../Routers/messages-routes");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ messahe: "hello to server" });
});

server.use("/api/lessons", lessonsRouter);
server.use("/api/messages", messagesRouter);
module.exports = server;
