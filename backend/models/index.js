// models/index.js
const sequelize = require('../db');
const User = require('./Users');
const Enfant = require('./Enfant');
const Activite = require('./Activite');
const UserEnfant = require('./UserEnfant');

const models = {
    User,
    Enfant,
    Activite,
    UserEnfant,
};


// Appel de la méthode associate pour chaque modèle si elle existe
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Définir les associations après avoir importé les modèles
models.Enfant.hasMany(models.Activite, { foreignKey: 'id_enfant' });
models.Activite.belongsTo(models.Enfant, { foreignKey: 'id_enfant' });

models.User.belongsToMany(models.Enfant, { through: models.UserEnfant, foreignKey: 'userId' });
models.Enfant.belongsToMany(models.User, { through: models.UserEnfant, foreignKey: 'enfantId' });


module.exports = {
    ...models,
    sequelize,
    User,
    Enfant,
    Activite,
    UserEnfant
};
