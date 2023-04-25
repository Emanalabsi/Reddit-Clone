const { connection } = require("../config");

const checkVoteQuery = (userId, postId) => {
  const sql = {
    text: `SELECT FROM votes WHERE user_id = $1 AND post_id = $2;`,
    values: [userId, postId],
  };
  return connection.query(sql);
};

const voteQuery = (postId, userId, vote) => {
  const sql = {
    text: `INSERT INTO votes (post_id, user_id,vote) values ($1, $2 ,$3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3 RETURNING *`,
    values: [postId, userId, vote],
  };
  return connection.query(sql);
};

const countVotes = () => {
  const sql = {
    text: `SELECT posts.title, SUM(CASE WHEN votes.vote = 1 THEN 1 ELSE 0 END) AS upvotes, SUM(CASE WHEN votes.vote = -1 THEN 1 ELSE 0 END) AS downvotes
    FROM posts
    LEFT JOIN votes ON posts.id = votes.post_id
    GROUP BY posts.id;`,
  };
  return connection.query(sql);
};
module.exports = { checkVoteQuery, voteQuery, countVotes };
