const express = require("express");
const Lessons = require("../models/dbHelpers");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const credentials = req.body;
    const { username, password } = credentials;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const hash = bcrypt.hashSync(password, 12);
    credentials.password = hash;

    const user = await Lessons.addUser(credentials);
    res.status(200).json(user);
  } catch (error) {
    if (error.errno === 19) {
      // Check if the error code is for a duplicate username
      console.log({ error });
      res.status(400).json({ message: "Username already taken" });
    } else {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await Lessons.findUserByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      console.log(token, "Token generated");
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: "we hope see you soon again!" });
      } else {
        res.status(200).json({ messahe: "succsesfully logged out" });
      }
    });
  } else {
    res.status(200).json({ message: "not logged in" });
  }
});

module.exports = router;
