require('dotenv').config({ path: "./.env" });
const express = require('express');
const sequelize = require('./db');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const childrenRoutes = require('./routes/childrenRoutes');
const activiteRoutes = require('./routes/activiteRoutes');
const usersRoutes = require('./routes/usersRoutes');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { init: initAuth } = require('./auth');
const path = require('path');

console.log('JWT Secret Key:', process.env.JWT_SECRET);
// Models
const models = require('./models')
const User = require('./models/Users.js');
const Child = require('./models/Child');
const Activite = require('./models/Activite');

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: corsOptions,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'pug');
app.use(express.json());

// ROUTES
app.use("/api/children", childrenRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/activites", activiteRoutes);
app.use("/api/admin", adminRoutes);

initAuth();
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);

const syncDatabase = async () => {
  try {
    // Synchroniser les tables sans les forcer à être recréées
    await sequelize.sync({ force: true }); // or simply await sequelize.sync();
    console.log('100% - ✅ Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();

app.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT} or http://127.0.0.1:${PORT}`);
});
