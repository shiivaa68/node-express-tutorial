const db = require("../dbConfig");

async function addUser(user) {
  return await db("users").insert(user, ["id", "username"]);
}

function findAllUsers() {
  return db("users");
}

function findUserByUsername(username) {
  return db("users").where({ username }).first();
}

module.exports = {
  addUser,
  findAllUsers,
  findUserByUsername,
};
