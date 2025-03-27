import express, { Request, Response } from "express";
import AuthService from "../services/authService";
import { Credentials } from '../types'
// import bcrypt from "bcryptjs";
// import generateToken from "./generateToken";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const credentials: Credentials = req.body;
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

router.post("/login", async (req: Request, res: Response) => {
  try {
    const credentials: Credentials = req.body;
    const user = await AuthService.loginUser(credentials);

    res
      .status(200)
      .json({ message: `Welcome ${user.username}`, token: user.token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router;
