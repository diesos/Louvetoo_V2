const sequelize = require('./db');
const models = require('./models');
const User = require('./models/User');
const Child = require('./models/Child');
const Activite = require('./models/Activite');
const UserChild = require('./models/UserChild');

const syncDatabase = async () => {
  try {

    await Child.sync;
    await Activite.sync;
    await User.sync;
    await UserChild.sync;

    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();
