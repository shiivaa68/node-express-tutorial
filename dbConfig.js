const config = require("./knexfile");
const dbEngine = process.env.DB_ENVIROMENT || "development";

module.exports = require("knex")(config[dbEngine]);
