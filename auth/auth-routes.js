const express = require("express");
const Lessons = require("../models/dbHelpers");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const router = express.Router();

router.post("/register", (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    return res.status(400).json({ message: "username and password required " });
  }

  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;

  Lessons.addUser(credentials)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      if (error.errno == 19) {
        res.status(400).json({ message: "username already taken" });
      } else {
        res.status(500).json(error);
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({ message: "username and password required" });
  }
  Lessons.findUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // session
        // req.session.user = {
        //   id: user.id,
        //   username: user.username,
        // };

        //create token
        const token = generateToken(user);
        console.log(token, "token hastan");
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "invallid credential" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
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
