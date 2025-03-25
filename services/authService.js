const bcrypt = require("bcryptjs");
const DbInstance = require("../models/userModel");
const generateToken = require("../controllers/generateToken");
const UserDTO = require("../dtos/UserDto");

const AuthService = () => {
  const registerUser = async (credentials) => {
    const { username, password } = credentials;

    if (!(username && password)) {
      throw new Error(
        "Username and password are required to register the user!"
      );
    }

    const hash = bcrypt.hashSync(password, 12);
    credentials.password = hash;

    const user = await DbInstance.addUser(credentials);
    return user;
  };

  const loginUser = async (credentials) => {
    const { username, password } = credentials;
    if (!(username, password)) {
      throw new Error("username and password are required");
    }
    // find user in the Database
    const user = await DbInstance.findUserByUsername(username);

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // generate token for authenticated user
    const token = generateToken(user);

    return new UserDTO(user, token);
  };

  return { registerUser, loginUser };
};

module.exports = AuthService();
