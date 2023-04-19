const { postSchema, updatePostSchema } = require("./posts");
const { loginSchema, signupSchema } = require("./users");

module.exports = { postSchema, loginSchema, signupSchema, updatePostSchema };
