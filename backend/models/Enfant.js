const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assurez-vous que '../db' pointe vers votre fichier de configuration Sequelize
const User = require('./Users'); // Assurez-vous que './Users' pointe vers le modèle User si nécessaire
const Activite = require('./Activite')

const Enfant = sequelize.define('Enfant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
});

// Enfant.associate = (models) => {
//   Enfant.hasMany(models.Activite, { foreignKey: 'id_enfant' });
// }; J'ai basculé sur le fichier index.js

module.exports = Enfant;
