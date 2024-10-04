const { Activite, Child } = require('../models');

const getAllActivites = async (req, res) => {
  try {
    const activites = await Activite.findAll({
      include: {
        model: Child,
        attributes: ['prenom', 'nom']
      }
    });
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
    const activite = await Activite.findOne({
      where: { id },
      include: {
        model: Child,
        attributes: ['prenom', 'nom']
      }
    });

    if (!activite) {
      return res.status(404).json({
        succes: false,
        error: "Activité non trouvée"
      });
    }
    res.status(200).send({
      succes: true,
      message: "Activité trouvée",
      data: activite
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Activité non trouvée",
      error: error.message
    });
  }
}

const addActivite = async (req, res) => {
  const { id, id_enfant, date, duree, photo, activity, autres } = req.body;
  try {
    const newActivite = await Activite.create({
      id,
      id_child,
      date,
      duree,
      photo,
      activity,
      autres
    });

    const activite = await Activite.findOne({
      where: { id: newActivite.id },
      include: {
        model: Enfant,
        attributes: ['prenom', 'nom']
      }
    });

    res.status(201).send({
      succes: true,
      message: "Activitée crée",
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
    const activite = await Activite.findOne({
      where: { id },
      include: {
        model: Enfant,
        attributes: ['prenom', 'nom']
      }
    });

    if (!activite) {
      return res.status(404).json({
        succes: false,
        error: "Activité non trouvée"
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
      message: "Activité mise à jour",
      data: activite
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteActivite = async (req, res) => {
  const { id } = req.params;
  try {
    const activite = await Activite.findOne({
      where: { id },
      include: {
        model: Enfant,
        attributes: ['prenom', 'nom']
      }
    });

    if (!activite) {
      return res.status(404).json({ error: "Activité non trouvée" });
    }

    await activite.destroy();
    res.status(200).send({
      succes: true,
      message: "Activité supprimée avec succès ✅",
      data: activite
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getActivitiesByChildId = async (req, res) => {
  const { id_enfant } = req.params;

  try {
    const activities = await Activite.findAll({
      where: { id_enfant },
      include: {
        model: Child,
        attributes: ['prenom', 'nom']
      }
    });

    if (activities.length > 0) {
      res.json({
        succes: true,
        message: `Activitée pour l'enfant avec ID : ${id_enfant}`,
        totalActivities: activities.length,
        data: activities
      });
    } else {
      res.json({
        succes: false,
        message: `Pas d'Activitées trouvée pour l'enfant avec ID: ${id_enfant}`
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: 'Une erreur s\'est produite lors de la récupération des activités pour cet enfant.',
      error: error.message
    });
  }
};

module.exports = { getAllActivites, getActivite, addActivite, updateActivite, deleteActivite, getActivitiesByChildId };
