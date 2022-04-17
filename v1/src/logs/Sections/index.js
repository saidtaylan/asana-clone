const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "section-service" },
  transports: [
    new winston.transports.File({
      filename: "v1/src/logs/Sections/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/Sections/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/Sections/combined.log",
    }),
  ],
});

module.exports = logger;
