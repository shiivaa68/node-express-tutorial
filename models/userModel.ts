import User from "../seqmodels/UserModel";
import { User as UserType, AddUserResult } from "../types";

async function addUser(user: Omit<UserType, "id">): Promise<AddUserResult> {
  try {
    const newUser = await User.create(user);
    return { id: newUser.id, username: newUser.username };
  } catch (error) {
    throw new Error(`error adding user :${error}`);
  }

  // const [result] = await db<User>("users").insert(user, ["id", "username"]);
  // return result;
}

async function findAllUsers(): Promise<UserType[]> {
  return await User.findAll();
}

async function findUserByUsername(username: string): Promise<UserType> {
  return await User.findOne({ where: { username } });
}

export default { addUser, findAllUsers, findUserByUsername };
