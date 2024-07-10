const { Activite, Enfant } = require('../models');


const getAllActivites = async (req, res) => {
	  try {
	const activites = await Activite.findAll(
		{
			include: {
			  model: Enfant, // Jointure avec le modèle Enfant
			  attributes: ['prenom', 'nom'] // Inclure uniquement les champs nécessaires
			}
		  }
	);
	if (!activites) {
	  return res.status(404).json({ error: "No activities found" });
	}
	res.status(200).send({
		succes: true,
		message: "All activities",
		totalActivities: activites.length,
		data: activites
	});
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
}

const getActivite = async (req, res) => {
	const { id } = req.params;
	try {
	  const activite = await Activite.findOne({ where: { id } });
	  if (!activite) {
		return res.status(404).json({
			succes: false,
			error: "Activity not found"
			});
	  }
	  res.status(200).send({
		succes: true,
		message: "Activity found",
		data: activite
	  })
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: "Activity not found",
			error: error.message });
	}
}

const addActivite = async (req, res) => {
	const { id, id_enfant, date, duree, photo, activity, autres } = req.body;
	try {
	  const activite = await Activite.create({
		id,
		id_enfant,
		date,
		duree,
		photo,
		activity,
		autres
	  });
	  res.status(201).send({
		succes: true,
		message: "Activity created",
		data: activite
	  });
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  }


  const updateActivite = async (req, res) => {
	const { id } = req.params;
	const { id_enfant, date, duree, photo, activity, autres } = req.body;
	try {
	  const activite = await Activite.findOne({ where: { id } });
	  if (!activite) {
		return res.status(404).json({
		  succes: false,
		  error: "Activity not found"
		});
	  }
	  await activite.update({
		id_enfant,
		date,
		duree,
		photo,
		activity,
		autres
	  });
	  res.status(200).send({
		succes: true,
		message: "Activity updated",
		data: activite
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }


const deleteActivite = async (req, res) => {
	const { id } = req.params;
	try {
	  const activite = await Activite.findOne({ where: { id } });
	  if (!activite) {
		return res.status(404).json({ error: "Activity not found" });
	  }
	  await activite.destroy();
	  res.status(200).send({
		succes: true,
		message: "Activity deleted",
		data: activite
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
}
getActivitiesByChildId = async (req, res) => {
	const { id_enfant } = req.params;

	try {
	  const activities = await Activite.findAll({
		where: {
		  id_enfant: id_enfant
		},
		include: [{ model: Enfant }] // Assuming you have associations set up
	  });

	  if (activities.length > 0) {
		res.json({
		  succes: true,
		  message: `Activities for child ID: ${id_enfant}`,
		  totalActivities: activities.length,
		  data: activities
		});
	  } else {
		res.json({
		  succes: false,
		  message: `No activities found for child ID: ${id_enfant}`
		});
	  }
	} catch (error) {
	  res.status(500).json({
		succes: false,
		message: 'An error occurred while fetching activities',
		error: error.message
	  });
	}
  };
module.exports = { getAllActivites, getActivite, addActivite, updateActivite, deleteActivite, getActivitiesByChildId};
