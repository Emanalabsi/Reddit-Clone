const pagesRouter = require("express").Router();

const path = require("path");

const { isAuth } = require("../middlewares");

pagesRouter.get("/home", isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "html", "home.html"));
});

pagesRouter.get("/profile", isAuth, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "html", "profile.html")
  );
});

module.exports = pagesRouter;
