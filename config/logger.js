const winston = require('winston');

// Define a custom timestamp function to format time in the local time zone
const localTimestamp = () => new Date().toLocaleString();

// Define a custom format for the log messages
const logFormat = winston.format.printf(({ level, message }) => {
    return `${localTimestamp()} [${level.toUpperCase()}]: ${message}`;
  });

const logger = winston.createLogger({
  level: 'info', // Set the desired logging level
  format: winston.format.combine(logFormat),
  transports: [
    // new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'logs.log' }), // Log to file
  ],
});

module.exports = logger;
