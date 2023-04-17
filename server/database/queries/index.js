const { addPost, deletePost, getPosts } = require("./posts");
const { loginQuery, signupQuery } = require("./users");

module.exports = { addPost, deletePost, getPosts, loginQuery, signupQuery };
