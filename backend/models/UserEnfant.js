const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserEnfant = sequelize.define('UserEnfant', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'User', // Utilisez le nom du modèle Sequelize, pas le nom de la table SQL
      key: 'id',
    },
  },
  enfantId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Enfant', // Utilisez le nom du modèle Sequelize, pas le nom de la table SQL
      key: 'id',
    },
  },
}, {
  tableName: 'user_enfant',
  timestamps: false,
});

module.exports = UserEnfant;
