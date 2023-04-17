const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  username: Joi.min(3).max(30).required(),
  password: Joi.string().required(),
  email: Joi.email().required(),
  img_url: Joi.string().required(),
});

module.exports = { loginSchema, signupSchema };
