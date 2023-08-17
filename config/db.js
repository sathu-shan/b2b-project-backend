const mysql = require('mysql');
const logger = require('./logger');

const db = {
  connection: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abi0902#',
    database: 'dbproject',
  }),
  
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      db.connection.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  
  connect: () => {
    db.connection.connect((error) => {
      if (error) {
        console.error('Error connecting to the database:', error);
      } else {
        console.log('Connected to the database');
      }
    });
  },
};

module.exports = db;
