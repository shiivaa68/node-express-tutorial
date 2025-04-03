// const db = require("../dbConfig");
import Message from "../seqmodels/MessageModel";
import Lesson from "../seqmodels/LessonModel";
import {Message as MessageType, AddMessageResult } from "../types";



 async function findMessageById(id: number): Promise<MessageType | undefined> {
  return await Message.findByPk(id);
}

async function addMessage(
  message: Partial<MessageType>,
  lesson_id: number
): Promise<AddMessageResult | undefined> {
  try {
    const newMessage = await Message.create({
      sender: message.sender,
      text: message.text,
      lesson_id, // Only necessary fields
    });

    return findMessageById(newMessage.id);
  } catch (error) {
    throw new Error(`Error adding message: ${error}`);
  }

  // const messageWithoutCreatedAt = {
  //   sender: message.sender,
  //   text: message.text,
  //   lesson_id, // Only necessary fields
  // };

  // const [id] = await db("messages")
  //   .where({ lesson_id })
  //   .insert(messageWithoutCreatedAt);
  // return findMessageById(id);
}

async function findLessonMessages(lesson_id: number): Promise<AddMessageResult[]> {

  return await Message.findAll({
    where: { lesson_id },
    include: [
      {
        model: Lesson,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "sender", "text"],
  });

  // const result =  await db("lessons as l")
  //   .join("messages as m", "l.id", "m.lesson_id")
  //   .select(
  //     "l.id as LessonID",
  //     "l.name as LessonName",
  //     "m.id as MessageID",
  //     "m.sender",
  //     "m.text"
  //   )
  //   .where({ lesson_id });
  //   return result
}
 async function removeMessage(id: number): Promise<number> {
  return await Message.destroy({ where: { id } });
  // return db("messages").where({ id: id }).del();
}

export default {
  removeMessage,
  addMessage,
  findLessonMessages,
  findMessageById,
};
