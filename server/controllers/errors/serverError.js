const { JsonWebTokenError } = require("jsonwebtoken");
const { ValidationError } = require("joi");
const { CustomError } = require("../../utils");

const serverError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res
      .status(400)
      .json({ error: true, data: { details: err.details } });
  } else if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      error: true,
      data: {
        message: "Unauthorized",
      },
    });
  } else if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ error: true, data: { message: err.message } });
  }

  res.json({ message: err.details });
};

module.exports = serverError;
