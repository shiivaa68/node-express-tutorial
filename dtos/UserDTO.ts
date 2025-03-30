import { User } from "../types";

class UserDTO {
  id: number;
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
  }

  static fromUser(user: User) {
    return new UserDTO(user);
  }
}

export default UserDTO;
