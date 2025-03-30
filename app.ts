import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import lessonsRouter from "./routers/lessons-routes";
import messagesRouter from "./routers/messages-routes";
import usersRouter from "./routers/users-routes";
import authRouter from "./controllers/authController";
import checkTokenMiddleware from "./middlewares/checkTokenMiddleware";

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

export default App;
