const sequelize = require('./db');
const User = require('./models/User');
const Child = require('./models/Child');
const Activite = require('./models/Activite');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();
