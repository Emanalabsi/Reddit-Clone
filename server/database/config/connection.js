const { Pool } = require("pg");

const options = {
  connectionString: process.env.DB_URL,
  ssl: true,
};

const connection = new Pool(options);

module.exports = connection;
