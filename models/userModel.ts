import { knexConfig as db } from "../dbConfig";
import { AddUserResult, User } from "../types";

async function addUser(user: Omit<User, "id">): Promise<AddUserResult> {
  const [result] = await db<User>("users").insert(user, ["id", "username"]);
  return result;
}

function findAllUsers(): Promise<User[]> {
  return db("users");
}

async function findUserByUsername(username: string): Promise<User> {
  const result = await db("users").where({ username }).first<User>();
  return result;
}

export default { addUser, findAllUsers, findUserByUsername };
