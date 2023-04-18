const connection = require("../config");

const loginQuery = (email) => {
  const sql = {
    text: `SELECT id,username, email,password FROM users where email=$1;`,
    values: [email],
  };

  return connection.query(sql);
};

const signupQuery = (userData) => {
  const { username, password, email } = userData;
  const sql = {
    text: `INSERT INTO users (username,password,email) values ($1,$2,$3) RETURNING *;`,
    values: [username, password, email],
  };
  return connection.query(sql);
};

const checkUserQuery = (email) => {
  const sql = {
    text: `SELECT * FROM users where email = $1;`,
    values: [email],
  };
  return connection.query(sql);
};

module.exports = { loginQuery, signupQuery, checkUserQuery };
