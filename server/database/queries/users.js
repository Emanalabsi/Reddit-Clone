const connection = require("../config");

const loginQuery = (email) => {
  const sql = {
    text: `SELECT * from users where email = $1;`,
    value: [email],
  };
  return connection.query(sql);
};

const signupQuery = (userData) => {
  const { username, password, email, img_url } = userData;
  const sql = {
    text: `insert into users (username,password,email,img_url) values ($1,$2,$3,$4);`,
    value: [username, password, email, img_url],
  };
  return connection.query(sql);
};

module.exports = { loginQuery, signupQuery };
