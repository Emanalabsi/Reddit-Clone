const { verifyToken } = require("../utils");

const isLogged = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next();
  }
  verifyToken(token)
    .then((decoded) => res.redirect("/"))
    .catch((err) => next(err));
};

module.exports = isLogged;
