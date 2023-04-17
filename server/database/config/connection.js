const { Pool } = require("pg");
const { NODE_ENV, DB_URL, DEV_DB_URL, TEST_DB_URL } = process.env;
let dbUrl = "";

if (NODE_ENV === "production") {
  dbUrl = DB_URL;
} else if (NODE_ENV === "development") {
  dbUrl = DEV_DB_URL;
} else if (NODE_ENV === "test") {
  dbUrl = TEST_DB_URL;
} else {
  throw new Error("Invalid database Url");
}

const connection = new Pool({
  connectionString: dbUrl,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = connection;
