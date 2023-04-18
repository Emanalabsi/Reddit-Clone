const clientError = (req, res) => {
  return res.status(404).json({
    error: true,
    data: {
      message: "404 Error",
    },
  });
};
module.exports = clientError;
