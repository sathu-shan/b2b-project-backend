// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('register', 'root', 'sathu0530A.', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('b2b_test', 'admin', 'Admin#123', {
  host: 'b2b-db-dev.cxas3mptqusg.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

module.exports = sequelize;