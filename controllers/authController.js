const express = require("express");

const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const AuthService = require("../services/authService");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const credentials = req.body;
    const user = await AuthService.registerUser(credentials);

    res.status(200).json(user);
  } catch (error) {
    if (error.errno === 19) {
      // Check if the error code is for a duplicate username
      console.log({ error });
      res.status(400).json({
        message: "Username already taken",
      });
    } else {
      res.status(500).json({
        message: "Error registering user",
        error: error.message,
      });
    }
  }
});


router.post("/login", async (req, res) => {
  try {
    const credentials = req.body;
    const user = await AuthService.loginUser(credentials);

    res
      .status(200)
      .json({ message: `Welcome ${user.username}`, token: user.token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// router.get("/logout", async (req, res) => {
//   try {
//     const response = await AuthService.logoutUser(req);
//     console.log(response, "response");
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
//   // if (req.session) {
//   //   req.session.destroy((error) => {
//   //     if (error) {
//   //       res.status(500).json({ message: "we hope see you soon again!" });
//   //     } else {
//   //       res.status(200).json({ messahe: "succsesfully logged out" });
//   //     }
//   //   });
//   // } else {
//   //   res.status(200).json({ message: "not logged in" });
//   // }
// });

module.exports = router;
