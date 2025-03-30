import express from "express";
import { SERVER_PORT } from "./config";
import App from "./app";
require("dotenv").config();

const startServer = async () => {
  const server = express();

  await App(server);

  server.listen(SERVER_PORT, () => {
    console.log(`server is ready on: http://localhost:${SERVER_PORT}...`);
  });
};

startServer();
