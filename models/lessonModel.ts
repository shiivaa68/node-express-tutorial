import { knexConfig as db } from "../dbConfig";
import { Lesson, AddLessonResult } from "../types";

async function add(lesson: Omit<Lesson, "id">): Promise<AddLessonResult> {
  const insertedLesson = await db("lessons").insert(lesson).returning("*");
  return insertedLesson[0];
}

function find(): Promise<Lesson[]> {
  return db("lessons");
}

async function findById(id: number): Promise<Lesson | undefined> {
  const result = await db("lessons").where({ id: id }).first<Lesson>();
  return result;
}
function remove(id: number): Promise<number> {
  return db("lessons").where({ id: id }).del();
}

function update(
  id: number,
  changes: Partial<Lesson>
): Promise<Lesson | undefined> {
  return db("lessons")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

export default { add, find, findById, remove, update };
