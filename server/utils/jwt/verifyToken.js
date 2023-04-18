const { verify } = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });
};

module.exports = verifyToken;
