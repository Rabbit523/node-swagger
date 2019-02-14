import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  exitOnError: false,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

export default logger;
