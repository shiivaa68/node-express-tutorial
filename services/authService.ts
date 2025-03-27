import bcrypt from "bcryptjs";
import UserModel from "../models/userModel";
import generateToken from "../controllers/generateToken";
import UserDTO from "../dtos/UserDTO";
import type { Credentials, User, AddUserResult, LoginResult } from "../types";

const AuthService = () => {
  const registerUser = async (
    credentials: Credentials
  ): Promise<AddUserResult> => {
    const { username, password } = credentials;

    if (!(username && password)) {
      throw new Error(
        "Username and password are required to register the user!"
      );
    }

    const hash = bcrypt.hashSync(password, 12);
    credentials.password = hash;

    const user = await UserModel.addUser(credentials);
    return user;
  };

  const loginUser = async (credentials: Credentials): Promise<LoginResult> => {
    const { username, password } = credentials;
    if (!(username && password)) {
      throw new Error("username and password are required");
    }
    // find user in the Database
    const user = await UserModel.findUserByUsername(username);

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // generate token for authenticated user
    const token = generateToken({ id: user.id, username: user.username });

    const userData = UserDTO.fromUser(user);

    return { ...userData, token };
  };

  return { registerUser, loginUser };
};

export default AuthService();
