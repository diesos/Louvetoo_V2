const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/Users");
const passport = require('passport');

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
  registerUser: async (req, res) => {
    const { prenom, nom, email, password, telephone, role } = req.body;

    if (!prenom || !nom || !email || !password || !telephone || !role) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs" });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "Un compte avec mail existe déja." });
    }


    await User.create({
      prenom,
      nom,
      email,
      password: bcrypt.hashSync(password, 8),
      telephone,
      role
    });

    res.status(201).json({ message: "Enregistement avec succès" });
  },

  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ error: "Mot de passe incorrect." });

      req.logIn(user, (err) => {
        if (err) return next(err);
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Connexion avec succès", Token: jwtToken });
      });
    })(req, res, next);
  },

  logoutUser: (req, res) => {
    req.logout(() => res.status(200).json({ message: "Logged out successfully" }));
  }
};
