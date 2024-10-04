// models/index.js
const sequelize = require('../db');
const User = require('./Users');
const Child = require('./Child');
const Activite = require('./Activite');
const UserChild = require('./UserChild');

const models = {
    User,
    Child,
    Activite,
    UserChild,
};


// Appel de la méthode associate pour chaque modèle si elle existe
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Définis les associations après avoir importé les modèles
models.Child.hasMany(models.Activite, { foreignKey: 'id_child' });
models.Activite.belongsTo(models.Child, { foreignKey: 'id_child' });

models.User.belongsToMany(models.Child, { through: models.UserChild, foreignKey: 'userId' });
models.Child.belongsToMany(models.User, { through: models.UserChild, foreignKey: 'childId' });


module.exports = {
    ...models,
    sequelize,
    User,
    Child,
    Activite,
    UserChild
};
