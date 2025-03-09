const express = require("express");
const session = require("express-session");
const lessonsRouter = require("../Routers/lessons-routes");
const messagesRouter = require("../Routers/messages-routes");
const usersRouter = require("../Routers/users-routes");
const authRouter = require("../auth/auth-routes");
const restricted = require("../auth/restricted-middleware");

const server = express();
const sessionConfig = {
  name: "monster",
  secret: process.env.SECRET,
  Cookie: {
    maxAge: 1000 * 60 * 60, //time stamp for cookies
    secure: false, //production  only https
    httpOnly: true, //no access to js
  },
  resave: false,
  saveUnitialized: true, //gdpr laws
};

server.use(express.json());

server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.json({ messahe: "hello to server" });
});

server.use("/api/auth", authRouter);
server.use("/api/lessons", restricted, lessonsRouter);
server.use("/api/messages", restricted, messagesRouter);
server.use("/api/users", restricted, usersRouter);
module.exports = server;
