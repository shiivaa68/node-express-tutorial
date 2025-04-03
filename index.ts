import express from "express";
import sequelize from "./dbseq";
import User from "./seqmodels/UserModel";
import { SERVER_PORT } from "./config";
import App from "./app";
require("dotenv").config();

const startServer = async () => {
  const server = express();

  await App(server);

  try {
    // Authenticate the Sequelize connection
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    // Sync models (create tables if not exist)
    await sequelize.sync({ alter: true }); // Use { force: true } to drop/recreate tables
    console.log("Tables synced!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  server.listen(SERVER_PORT, () => {
    console.log(`server is ready on: http://localhost:${SERVER_PORT}...`);
  });
};

startServer();
