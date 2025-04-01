import UserDTO from "./dtos/UserDTO";
import LessonDTO from "./dtos/LessonDTO";
import MessageDTO from "./dtos/MessageDTO";

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
export type AddLessonResult = InstanceType<typeof LessonDTO>;

export interface Lesson {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: number;
  lesson_id: number;
  sender: string;
  text: string;
  createdAt: Date;
}
