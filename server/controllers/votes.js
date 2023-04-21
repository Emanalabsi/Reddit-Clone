const { voteQuery, checkVoteQuery } = require("../database/queries/votes");
const { CustomError } = require("../utils");

const vote = (req, res, next) => {
  const { postId, vote } = req.params;
  const { id } = req.user;

  checkVoteQuery(id, postId)
    .then((data) => {
      if (data.rows.length && data.rows[0].vote === parseInt(vote, 10)) {
        throw new CustomError("You have already voted", 400);
      }
    })
    .then(() => {
      voteQuery(postId, id, vote);
    })
    .then((data) =>
      res.json({
        success: true,
        data: data.rows,
      })
    )
    .catch((err) => next(err));
};

module.exports = vote;
