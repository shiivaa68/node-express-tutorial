const db = require("../dbConfig");

function findMessageById(id) {
  return db("messages").where({ id }).first();
}

async function addMessage(message, lesson_id) {
  const [id] = await db("messages").where({ lesson_id }).insert(message);
  return findMessageById(id);
}

function findLessonMessages(lesson_id) {
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
function removeMessage(id) {
  return db("messages").where({ id: id }).del();
}

module.exports = {
  removeMessage,
  addMessage,
  findLessonMessages,
  findMessageById,
};
