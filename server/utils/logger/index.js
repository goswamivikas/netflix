const buildDevLogger = require("./devLogger");
const buildProdLogger = require("./prodLogger");
require("dotenv").config();

let logger = null;
if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;
