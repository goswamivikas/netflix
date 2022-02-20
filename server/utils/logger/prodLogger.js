const { format, createLogger, transports } = require("winston");
const { timestamp, combine, errors, json } = format;

function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "netflix-service" },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "app.log",
        level: "info",
        colorize: false,
      }),
    ],
  });
}

module.exports = buildProdLogger;
