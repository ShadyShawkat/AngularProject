const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.log("jwtPriveteKey is not set");
    process.exit(1);
  }
};
