const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./Users');
const Child = require('./Child');

const UserChild = sequelize.define('UserChild', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  childId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Child',
      key: 'id',
    },
  },
}, {
  tableName: 'user_child',
  timestamps: false,
});

module.exports = UserChild;
