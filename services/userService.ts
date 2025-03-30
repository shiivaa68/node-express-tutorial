import UserModel from "../models/userModel";
import UserDTO from "../dtos/UserDTO";
import { User } from "../types";

const UserService = () => {
  const getAllUser = async (): Promise<UserDTO[]> => {
    const users: User[] = await UserModel.findAllUsers();
    return users.map((user) => UserDTO.fromUser(user));
  };

  const findUserByUsername = async (
    username: string
  ): Promise<UserDTO | null> => {
    const foundUser = await UserModel.findUserByUsername(username);
    if (!foundUser) {
      return null;
    }
    return UserDTO.fromUser(foundUser);
  };

  return {
    getAllUser,
    findUserByUsername,
  };
};

export default UserService();
