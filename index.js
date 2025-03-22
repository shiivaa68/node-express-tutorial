const express = require("express");
const { SERVER_PORT } = require("./config");
const App = require("./app");
require("dotenv").config();

const startServer = async () => {
  const server = express();

  await App(server);

  server.listen(SERVER_PORT, () => {
    console.log(`server is ready on: http://localhost:${SERVER_PORT}...`);
  });
};

startServer();
