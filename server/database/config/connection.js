const { Pool } = require("pg");
const { NODE_ENV, DB_URL } = process.env;

const option = {
  connectionString: DB_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

const connection = new Pool(option);

module.exports = connection;
