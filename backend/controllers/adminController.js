const { User, Child, UserChild } = require('../models');

const adminAssociateChild = async (req, res) => {
  const { userId, childId } = req.body; /
  try {
    // Vérifiez si l'utilisateur existe
    const utilisateur = await User.findByPk(userId);
    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Vérifiez si l'enfant existe
    const enfant = await Child.findByPk(childId);
    if (!enfant) {
      return res.status(404).json({ error: "Enfant non trouvé" });
    }

    // Vérifiez si l'association entre l'utilisateur et l'enfant existe déjà
    const associationExistante = await UserChild.findOne({
      where: {
        userId: userId,
        childId: childId
      }
    });

    if (associationExistante) {
      return res.status(400).json({ error: "Cette association existe déjà" });
    }

    // Créez l'association entre l'utilisateur et l'enfant dans la table de jointure
    await UserChild.create({
      userId: userId,
      childId: childId
    });

    res.status(200).json({
      success: true,
      message: "Enfant associé avec succès à l'utilisateur",
      data: {
        utilisateur: utilisateur,
        enfant: enfant
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { adminAssociateChild };
