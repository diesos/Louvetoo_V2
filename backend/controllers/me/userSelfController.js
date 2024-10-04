const User = require('../../models/Users');
const Child = require('../../models/Child');
const UserChild = require('../../models/UserChild');
const Activite = require('../../models/Activite')
const jwt = require('jsonwebtoken');


const myInfo = async (req, res) => {
  try {

    const { password, ...userWithoutPassword } = req.user.dataValues;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: "Vous n'êtes pas connectée" });
  }
};

const getUserAndChildren = async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user.dataValues;
    const userId = req.user.dataValues.id;

    console.log('User ID:', userId);

    // Récupère les enfants associés à l'utilisateur
    const children = await Child.findAll({
      include: {
        model: User,
        through: {
          model: UserChild,
          attributes: [] // Ne retourne que les enfants
        },
        where: { id: userId }
      }
    });

    console.log('Children:', children);
    res.json({
      user: userWithoutPassword,
      children: children.length > 0 ? children : []
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'An error occurred while retrieving user and children data',
      message: error.message
    });
  }
};

module.exports = { myInfo, getUserAndChildren}
