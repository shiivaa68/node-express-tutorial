import config from "./knexfile";
import knex from "knex";

const dbEngine = process.env.DB_ENVIROMENT || "development";

export const knexConfig = knex(config[dbEngine]);
