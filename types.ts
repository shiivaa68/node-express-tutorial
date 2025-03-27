import UserDTO from "./dtos/UserDTO";

export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  id: number;
}

// export type AddUserResult = Pick<User, "id" | "username">;
// export type LoginResult = Pick<User, "id" | "username"> & { token: string };

export type AddUserResult = InstanceType<typeof UserDTO>;
export type LoginResult = InstanceType<typeof UserDTO> & { token: string };

export interface Lesson {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
