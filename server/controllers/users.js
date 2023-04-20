const { hash, compare } = require("bcrypt");
const {
  loginSchema,
  signupSchema,
  generateToken,
  CustomError,
} = require("../utils");
const {
  loginQuery,
  signupQuery,
  checkUserQuery,
} = require("../database/queries");

const signup = (req, res, next) => {
  const { username, email, password } = req.body;
  signupSchema
    .validateAsync({ username, email, password }, { abortEarly: false })
    .then(({ email }) => checkUserQuery(email))
    .then((data) => {
      if (data.rows > 0) {
        throw new CustomError("username or email is not valid", 401);
      }
      return hash(password, 10);
    })
    .then((hash) => signupQuery({ username, email, password: hash }))
    .then((newUserData) => {
      req.user = newUserData.rows[0];
      return generateToken({ username: req.user.username, id: req.user.id });
    })
    .then((token) => {
      res.cookie("token", token, { httpOnly: true }).json({
        error: false,
        data: { massage: "user created successfully", user: req.user },
      });
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  loginSchema
    .validateAsync({ email, password }, { abortEarly: false })
    .then(({ email }) => loginQuery(email))
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new CustomError("email or password is incorrect", 400);
      }
      return rows[0];
    })
    .then((data) => {
      req.user = data;
      return compare(password, data.password);
    })
    .then((match) => {
      if (!match) {
        throw new CustomError("email or password is incorrect", 400);
      }
      return generateToken({ email: req.user.email, id: req.user.id });
    })
    .then((token) => {
      res
        .cookie("token", token)
        .json({ status: res.status, message: "Logged in successfully" });
    })
    .catch((err) => next(err));
};

const logout = (req, res, next) => {
  res.clearCookie("token").redirect("/");
};

module.exports = { signup, login, logout };
