const connection = require("../config");

const loginQuery = (userData) => {
  const { username } = userData;

  const sql = {
    text: `SELECT id,username, email,password, img_url FROM users where username=$1`,
    values: [username],
  };

  return connection.query(sql);
};
const signupQuery = (userData) => {
  const { username, password, email, img_url } = userData;
  const sql = {
    text: `INSERT INTO users (username,password,email,img_url) values ($1,$2,$3,$4);`,
    value: [username, password, email, img_url],
  };
  return connection.query(sql);
};

module.exports = { loginQuery, signupQuery };
