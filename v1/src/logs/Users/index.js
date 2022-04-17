const winston = require("winston")

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'v1/src/logs/Users/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'v1/src/logs/Users/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'v1/src/logs/Users/combined.log' }),
    ],
  });

  module.exports = logger