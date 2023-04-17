const connection = require("../config");

const addPost = (postData) => {
  const { title, description, media, user_id } = postData;
  const sql = {
    text: `insert into posts (title, description, media, user_id) values ($1,$2,$3,$4) returning user_id;`,
    value: [title, description, media, user_id],
  };
  return connection.query(sql);
};
const deletePost = (postId) => {
  const sql = {
    text: `delete * from posts where post_id = $1;`,
    value: [postId],
  };
  return connection.query(sql);
};

const getPosts = (userId) => {
  const sql = {
    text: `select * from posts where user_ id = $1;`,
    value: [userId],
  };
  return connection.query(sql);
};

module.exports = { addPost, deletePost, getPosts };
