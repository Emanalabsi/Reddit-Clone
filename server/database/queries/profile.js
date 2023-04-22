const { connection } = require("../config");

const getِUserPostsQuery = (userId) => {
  const sql = {
    text: `SELECT 
    posts.id AS post_id, 
    posts.title AS post_title, 
    posts.description AS post_description,
    posts.media AS post_media,
   json_agg(json_build_object('comment_id', comments.id, 'comment_content', comments.content, 'vote_value', votes.vote)) AS comments FROM posts JOIN users ON posts.user_id = users.id LEFT JOIN comments ON posts.id = comments.post_id LEFT JOIN votes ON posts.id = votes.post_id WHERE users.id = $1 GROUP BY posts.id,posts.title,posts.description, posts.media ORDER BY posts.id;
  `,
    values: [userId],
  };
  return connection.query(sql);
};

module.exports = getِUserPostsQuery;
