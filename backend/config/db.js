const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('register', 'root', 'sathu0530A.', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
