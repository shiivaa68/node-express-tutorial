// const db = require("../dbConfig");
import { knexConfig as db } from "../dbConfig";

interface Message {
  id: number;
  lesson_id: number;
  sender: string;
  text: string;
  createdAt?: Date;
}

function findMessageById(id: number): Promise<Message | undefined> {
  return db("messages").where({ id }).first();
}

async function addMessage(
  message: Partial<Message>,
  lesson_id: number
): Promise<Message | undefined> {
  // const messageWithCreatedAt = {
  //   ...message,
  //   createdAt: message.createdAt || new Date() , // If createdAt is not provided, use the current date
  //   lesson_id, // Make sure lesson_id is included as well
  // };
  const messageWithoutCreatedAt = {
    sender: message.sender,
    text: message.text,
    lesson_id, // Only necessary fields
  };

  const [id] = await db("messages")
    .where({ lesson_id })
    .insert(messageWithoutCreatedAt);
  return findMessageById(id);
}

function findLessonMessages(lesson_id: number): Promise<Message[]> {
  return db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as LessonID",
      "l.name as LessonName",
      "m.id as MessageID",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id });
}
function removeMessage(id: number): Promise<number> {
  return db("messages").where({ id: id }).del();
}

export default {
  removeMessage,
  addMessage,
  findLessonMessages,
  findMessageById,
};
