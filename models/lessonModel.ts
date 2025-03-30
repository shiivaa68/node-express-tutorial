import { knexConfig as db } from "../dbConfig";
import { Lesson } from "../types";

async function add(lesson: Lesson): Promise<Lesson> {
  const insertedLesson = await db("lessons").insert(lesson).returning("*");
  return insertedLesson[0];
}

function find(): Promise<Lesson[]> {
  return db("lessons");
}

function findById(id: number): Promise<Lesson | undefined> {
  return db("lessons").where({ id: id }).first();
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
