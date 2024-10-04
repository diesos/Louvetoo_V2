const Child = require('../models/Child');
const { Op } = require('sequelize');



// GET all children
const getAllChildren = async (req, res) => {
	  try {
	const children = await Child.findAll();
	if (!children) {
	  return res.status(404).json({ error: "Aucun enfant ne correspond" });
	}
	res.status(200).send({
		succes: true,
		message: "Tous les enfants trouvés",
		totalChildren: children.length,
		data: children
	});
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
};
// Find a child by id
const getChild = async (req, res) => {
	const { id } = req.params;
	try {
	  const child = await Child.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({
			succes: false,
			error: "Enfant non trouvé"
			});
	  }
	  res.status(200).send({
		succes: true,
		message: "Enfant trouvé",
		data: child
	  })
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: "Enfant non trouvé",
			error: error.message });
	}
};
// Add a child
const addChild = async (req, res) => {
	const { prenom, nom, date_naissance, allergie, diet} = req.body;
	try {
	  const child = await Child.create({
		prenom,
		nom,
		date_naissance,
		allergie,
		diet
	  });
	  res.status(201).send({
		succes: true,
		message: "Enfant ajouté",
		data: child
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const updateChild = async (req, res) => {
	const { id } = req.params;
	const { prenom, nom, date_naissance, allergie, diet } = req.body;
	try {
	  const child = await Child.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({ error: "Aucun résultat" });
	  }
	  child.prenom = prenom;
	  child.nom = nom;
	  child.date_naissance = date_naissance;
	  child.allergie = allergie;
	  child.diet = diet;
	  await child.save();
	  res.status(200).send({
		succes: true,
		message: "Enfant mis à jour",
		data: child
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const deleteChild = async (req, res) => {
	const { id } = req.params;
	try {
	  const child = await Child.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({ error: "Enfant non trouvé" });
	  }
	  await child.destroy();
	  res.status(200).send({
		succes: true,
		message: "Enfant supprimé",
		data: child
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const getChildSuggestion = async (req, res) => {
	const { prenom } = req.query;
    if (!prenom) {
        return res.status(400).json({ message: 'Prenom query parameter is required' });
    }
    try {
        const children = await Child.findAll({
            where: {
                prenom: {
                    [Op.like]: `%${prenom}%`
                }
            }
        });
        res.json(children);
    } catch (error) {
        console.error('Error searching for children:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllChildren, getChild, addChild, updateChild, deleteChild, getChildSuggestion}
