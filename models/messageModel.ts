// const db = require("../dbConfig");
import { knexConfig as db } from "../dbConfig";
import { Message,AddMessageResult } from "../types";



function findMessageById(id: number): Promise<Message | undefined> {
  return db("messages").where({ id }).first();
}

async function addMessage(
  message: Partial<Message>,
  lesson_id: number
): Promise<AddMessageResult | undefined> {

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

async function findLessonMessages(lesson_id: number): Promise<AddMessageResult[]> {
  const result =  await db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as LessonID",
      "l.name as LessonName",
      "m.id as MessageID",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id });
    return result
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
