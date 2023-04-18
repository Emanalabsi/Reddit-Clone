const { sign } = require("jsonwebtoken");

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    sign(payload, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = generateToken;
