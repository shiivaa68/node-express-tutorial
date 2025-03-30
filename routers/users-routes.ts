import express, { Request, Response } from "express";
import UserModel from "../models/userModel";
import UserDTO from "../dtos/UserDTO";
import UserService from "../services/userService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "unable to retrive users" });
  }
});

router.get(
  "/:username",
  async (req: Request<{ username: string }>, res: Response) => {
    try {
      const { username } = req.params;
      const user = await UserService.findUserByUsername(username);

      res.status(200).json(user);
    } catch (error) {
      console.log({ error });
      res.status(500).json(error);
    }
  }
);
export default router;
