const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(1000).required(),
  media: Joi.string(),
  user_id: Joi.number(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(20),
  description: Joi.string().min(3).max(1000),
  id: Joi.number(),
});

module.exports = { postSchema, updatePostSchema };
