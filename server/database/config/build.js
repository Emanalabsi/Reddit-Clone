const { readFileSync } = require("fs");
const { join } = require("path");
const connection = require("./connection");

const build = () => {
  const sql = readFileSync(
    join(__dirname, "..", "migrations", "init.sql")
  ).toString();
  return connection.query(sql);
};

module.exports = build;
