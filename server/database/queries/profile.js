const { connection } = require("../config");

const getِUserPostsQuery = (userId) => {
  const sql = {
    text: `SELECT 
    posts.id AS post_id, 
    posts.title AS post_title, 
    posts.description AS post_description,
    posts.media AS post_media,
    comments.id AS comment_id, 
    comments.content AS comment_content, 
    votes.vote AS vote_value 
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN votes ON posts.id = votes.post_id
    WHERE users.id =2
    ORDER BY posts.id, comments.id;
  `,
    values: [userId],
  };
  return connection.query(sql);
};

module.exports = getِUserPostsQuery;
