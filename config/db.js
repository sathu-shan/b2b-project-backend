const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('b2b_test', 'bemal', 'Bemal123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
