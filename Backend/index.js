const db_debug = require("debug")("vidly:db");
const winston = require("winston");
const config = require("config");
var cors = require("cors");

const express = require("express");
const app = express();
// var corsOptions = {
//   "Access-Control-Expose-Headers": "x-auth-token",
//   "Access-Control-Allow-Headers": "x-auth-token",
// };

var corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use(cors(corsOptions));
// app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
const connectionString = config.get("db");
require("./startup/connecttodatabase")(connectionString);
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 1998;
const server = app.listen(port, () => {
  winston.info(`Listening on ${port}`);
});

module.exports = server;
