const connection = require('../config/db');

class User {
  static create(userData) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', userData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // Add more methods here as needed
}

module.exports = User;
