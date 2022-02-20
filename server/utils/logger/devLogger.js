const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, errors } = format;

function buildDevLogger() {
  const logFormat = printf(({ level, message, timestamp, stack, metadata }) => {
    return `${timestamp} ${level}: ${stack || message}: ${
      Object.keys(metadata).length === 0 ? "" : JSON.stringify(metadata)
    }`;
  });

  return createLogger({
    format: combine(
      format.metadata({
        fillExcept: ["message", "level", "timestamp", "label"],
      })
    ),
    transports: [
      new transports.Console({
        format: combine(
          format.colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          errors({ stack: true }),
          format.prettyPrint(),
          logFormat
        ),
        level: "debug",
      }),
      new transports.File({
        filename: "app.log",
        level: "debug",
        format: combine(
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          errors({ stack: true }),
          format.json()
        ),
        colorize: false,
      }),
    ],
  });
}

module.exports = buildDevLogger;
