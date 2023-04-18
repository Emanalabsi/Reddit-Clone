const { verifyToken, CustomError } = require("../utils");

const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new CustomError("Unauthorized", 401);
  }
  verifyToken(token)
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch((err) => next(err));
};

module.exports = isAuth;
