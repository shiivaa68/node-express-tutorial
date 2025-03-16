const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const lessonsRouter = require("../Routers/lessons-routes");
const messagesRouter = require("../Routers/messages-routes");
const usersRouter = require("../Routers/users-routes");
const authRouter = require("../auth/auth-routes");
const restricted = require("../auth/restricted-middleware");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "hello to server" });
});

server.use("/api/auth", authRouter);
server.use("/api/lessons", restricted, lessonsRouter);
server.use("/api/messages", restricted, messagesRouter);
server.use("/api/users", restricted, usersRouter);
module.exports = server;
