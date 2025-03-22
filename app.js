const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const lessonsRouter = require("./routers/lessons-routes");
const messagesRouter = require("./routers/messages-routes");
const usersRouter = require("./routers/users-routes");
const authRouter = require("./controllers/authController");
const checkTokenMiddleware = require("./middlewares/checkTokenMiddleware");

const App = (app) => {
  // set up express configs
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());

  // set up routes
  app.get("/", (req, res) => {
    res.json({ message: "Ready!" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/lessons", checkTokenMiddleware, lessonsRouter);
  app.use("/api/messages", checkTokenMiddleware, messagesRouter);
  app.use("/api/users", checkTokenMiddleware, usersRouter);

  return app;
};

module.exports = App;
