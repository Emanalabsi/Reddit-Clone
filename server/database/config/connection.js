// const { Pool } = require("pg");
// // const { NODE_ENV, DATABASE_URL, DEV_DB_URL, TEST_DB_URL } = process.env;
// // let dbUrl = "";

// // if (NODE_ENV === "production") {
// //   dbUrl = DATABASE_URL;
// // } else if (NODE_ENV === "development") {
// //   dbUrl = DEV_DB_URL;
// // } else if (NODE_ENV === "test") {
// //   dbUrl = TEST_DB_URL;
// // } else {
// //   throw new Error("Invalid database Url");
// // }

// const connection = new Pool({
//   connectionString: process.env.DB_URL
//   ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
// });

// module.exports = connection;

const { Pool } = require("pg");

const options = {
  connectionString: process.env.DB_URL,
  ssl: false,
};

const connection = new Pool(options);

module.exports = connection;
