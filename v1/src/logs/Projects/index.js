const winston = require("winston")

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'project-service' },
    transports: [
      new winston.transports.File({ filename: 'v1/src/logs/Projects/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'v1/src/logs/Projects/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'v1/src/logs/Projects/combined.log' }),
    ],
  });

  module.exports = logger