const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(/^[a-zA-Z0-9 ._#?!-@]/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(/^[a-zA-Z0-9 ._#?!-@]/)
    .required(),
});

module.exports = { loginSchema, signupSchema };
