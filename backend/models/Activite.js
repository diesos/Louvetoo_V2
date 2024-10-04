const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Child = require('./Child');

const Activite = sequelize.define('Activite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  activity: {
    type: DataTypes.ENUM('entree', 'sortie', 'dodo', 'repas', 'change', 'loisir', 'autre'),
    allowNull: false
  },
  autres: {
    type: DataTypes.STRING,
    allowNull: true, // Peut être nul si l'activité n'est pas 'autre'
    validate: {
      checkAutres(value) {
        if (this.activity === 'autre' && !value) {
          throw new Error('Le champ "autres" est requis lorsque l\'activité est "autre".');
        }
      }
    }
  },
  id_child: {
    type: DataTypes.INTEGER,
    references: {
      model: Child,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = Activite;
