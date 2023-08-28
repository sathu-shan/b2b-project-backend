const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbproject', 'root', 'abi0902#', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
