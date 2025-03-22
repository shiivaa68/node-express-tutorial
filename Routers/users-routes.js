const express = require("express");
const UserModel = require("../models/userModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "unable to retrive users" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const { password, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
});

module.exports = router;
