// import { knexConfig as db } from "../dbConfig";
import Lesson from "../seqmodels/LessonModel";
import { Lesson as LessonType, AddLessonResult } from "../types";

async function add(lesson: Omit<LessonType, "id">): Promise<AddLessonResult> {
  try {
    const newLesson = await Lesson.create(lesson);
    return newLesson[0];
  } catch (error) {
    throw new Error(`Error adding lesson: ${error}`);
  }
  // const insertedLesson = await db("lessons").insert(lesson).returning("*");
  // return insertedLesson[0];
}

async function find(): Promise<Lesson[]> {
  return await Lesson.findAll();
  // return db("lessons");
}

async function findById(id: number) {
  // : Promise<LessonType | undefined>
  return await Lesson.findByPk(id);
  // const result = await db("lessons").where({ id: id }).first<LessonType>();
  // return result;
}
 async function remove(id: number): Promise<number> {
  return await Lesson.destroy({ where: { id } });
  // return db("lessons").where({ id: id }).del();
}

async function update(id: number, changes: Partial<LessonType>): Promise<Lesson | null> {
  const lesson = await findById(id);
  if (!lesson) return null;

  await lesson.update(changes);
  return lesson;
}
// function update(
//   id: number,
//   changes: Partial<LessonType>
// ): Promise<LessonType | undefined> {
//   return db("lessons")
//     .where({ id })
//     .update(changes)
//     .then(() => {
//       return findById(id);
//     });
// }

export default { add, find, findById, remove, update };
