const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./Users');
const Activite = require('./Activite')

const Child = sequelize.define('Child', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  allergie: {
    type: DataTypes.STRING,
    allowNull: true
  },
  diet: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: sequelize.literal('CURRENT_TIMESTAMP')
  }

}
, {
  tableName: 'Child'
});

module.exports = Child;
