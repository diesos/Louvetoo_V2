const Users = require('../models/Users');
const Enfant = require('../models/Enfant');


// GET all Userren
const getAllUsers = async (req, res) => {
	  try {
	const User = await Users.findAll();
	if (!User) {
	  return res.status(404).json({ error: "Aucun utilisateur trouvé" });
	}
	res.status(200).send({
		succes: true,
		message: "Tous les utilisateurs trouvés",
		totalUsers: User.length,
		data: User
	});
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
};
// Find a User by id
const getUser = async (req, res) => {
	const { id } = req.params;
	try {
	  const User = await Users.findOne({ where: { id } });
	  if (!User) {
		return res.status(404).json({
			succes: false,
			error: "Utilisateur non trouvé"
			});
	  }
	  res.status(200).send({
		succes: true,
		message: "Utilisateur trouvé",
		data: User
	  })
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: "Utilisateur non trouvé",
			error: error.message });
	}
};
// Add a User
const addUser = async (req, res) => {
	const { prenom, nom, email, password, telephone, role } = req.body;
	try {
	  const User = await Users.create({
		prenom,
		nom,
		email,
		password,
		telephone,
		role
	  });
	  res.status(201).send({
		succes: true,
		message: "Utilisateur ajouté",
		data: User
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { prenom, nom, email, password, telephone, role } = req.body;
	try {
	  const User = await Users.findOne({ where: { id } });
	  if (!User) {
		return res.status(404).json({ error: "Utilisateur non trouvé" });
	  }
	  User.prenom = prenom;
	  User.nom = nom;
	  User.email = email;
	  User.password = password;
	  User.telephone = telephone;
	  User.role = role;
	  await User.save();
	  res.status(200).send({
		succes: true,
		message: "Utilisateur mis à jour",
		data: User
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
	  const User = await Users.findOne({ where: { id } });
	  if (!User) {
		return res.status(404).json({ error: "Utilisateur non trouvé" });
	  }
	  await User.destroy();
	  res.status(200).send({
		succes: true,
		message: "Utilisateur supprimé",
		data: User
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }



  module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
