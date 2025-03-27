import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserDTO from "../dtos/UserDTO";

dotenv.config();

const generateToken = (user: InstanceType<typeof UserDTO>): string => {
  if (!process.env.SECRET) {
    throw new Error("missing secret in envirement variable");
  }

  const secret = process.env.SECRET;
  const options = { expiresIn: "1d" };
  
  return jwt.sign(user, secret, options);
};

export default generateToken;
