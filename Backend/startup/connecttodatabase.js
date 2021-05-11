const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function (connectionString) {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`Connected to ${connectionString}`))
    .catch(() => console.log("Failed To connect"));
};
