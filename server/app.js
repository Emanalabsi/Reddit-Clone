require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const { serverError, clientError } = require("../server/controllers/errors");

const app = express();

app.disable("x-powered-by");

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/v1", router);
app.use(serverError);
app.use(clientError);

module.exports = app;
