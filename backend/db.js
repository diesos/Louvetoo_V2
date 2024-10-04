const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('daycare_db3', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
