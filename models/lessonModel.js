const db = require("../dbConfig");

async function add(lesson) {
  const [id] = await db("lessons").insert(lesson);
  // return id;
}





function find() {
  return db("lessons");
}
function findById(id) {
  return db("lessons").where({ id: id }).first();
}
function remove(id) {
  return db("lessons").where({ id: id }).del();
}

function update(id, changes) {
  return db("lessons")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  
};
