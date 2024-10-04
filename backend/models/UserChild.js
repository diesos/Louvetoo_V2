const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserChild = sequelize.define('UserEnfant', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  enfantId: {
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
