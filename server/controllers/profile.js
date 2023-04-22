const { json } = require("express");
const getِUserPostsQuery = require("../database/queries/profile");

const getUserPosts = (req, res, next) => {
  const { id } = req.user;
  getِUserPostsQuery(id).then(console.log);
  // .then((result) => {
  //   if (result.rowCount === 0) {
  //     throw new CustomError("No posts found", 401);
  //   }
  // console.log(result.rows);
  // const data = result.rows.map((row) => {
  //   const comments = JSON.parse(row.comments);
  //   console.log(comments);
  //   return {
  //     post_id: row.post_id,
  //     post_title: row.post_title,
  //     post_description: row.post_description,
  //     post_media: row.post_media,
  //     comments: comments,
  //   };
  // });
  // res.status(200).json({
  //   error: false,
  //   data: JSON.stringify(data),
  // });
  // })
  // .catch((err) => next(err));
};

// const getUserPosts = (req, res, next) => {
//   const { id } = req.user;

//   getUserPostsQuery(id).then((result) => {
//     if (result.rowCount === 0) {
//       throw new CustomError("No posts found", 401);
//     }
//     const data = result.rows.map((row) => {
//       const comments = JSON.parse(row.comments);
//       return {
//         post_id: row.post_id,
//         post_title: row.post_title,
//         post_description: row.post_description,
//         post_media: row.post_media,
//         comments: comments,
//       };
//     });
//     console.log(data);
//   });
// };

// const getUserPosts = (req, res, next) => {
//   const { id } = req.user;
//   getِUserPostsQuery(id)
//     .then((result) => {
//       if (result.rowCount === 0) {
//         throw new CustomError("No posts found", 401);
//       }
//       const data = result.rows.map((row) => {
//         const comments = JSON.parse(row.comments);
//         return {
//           post_id: row.post_id,
//           post_title: row.post_title,
//           post_description: row.post_description,
//           post_media: row.post_media,
//           comments: comments,
//         };
//       });
//       res.json({
//         error: false,
//         data: data,
//       });
//       console.log(data);
//     })
//     .catch((err) => next(err));
// };

// const getUserPosts = (req, res, next) => {
//   const { id } = req.user;
//   getِUserPostsQuery(id)
//     .then((result) => {
//       if (result.rowCount === 0) {
//         throw new CustomError("No posts found", 401);
//       }
//       return result.rows;
//     })
//     .then((rows) => {
//       const data = rows.map((row) => {
//         const comments = JSON.parse(row.comments);
//         return {
//           post_id: row.post_id,
//           post_title: row.post_title,
//           post_description: row.post_description,
//           post_media: row.post_media,
//           comments: comments,
//         };
//       });
//       res.json({
//         error: false,
//         data: JSON.stringify(data),
//       });
//     })
//     .catch((err) => next(err));
// };

module.exports = getUserPosts;
