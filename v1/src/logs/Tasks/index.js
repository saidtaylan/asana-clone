const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "task-service" },
  transports: [
    new winston.transports.File({
      filename: "v1/src/logs/Tasks/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/Tasks/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/Tasks/combined.log",
    }),
  ],
});

module.exports = logger;
