class UserDTO {
  constructor(user, token) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;

    // this.token = token;
  }
}

module.exports = UserDTO;
