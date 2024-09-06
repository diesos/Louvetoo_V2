const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const {
	getAllUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	associateChild} = require('../controllers/usersController');
const {verifyToken} = require('../middleware/verifyToken')
const {verifyAdmin} = require('../middleware/verifyAdmin')
const {
	myInfo,
	getUserAndChildren
} = require('../controllers/me/userSelfController')

// GET ROUTES for users
// GET all users
router.get('/getallusers', getAllUsers);
// GET a user
router.get('/getuser/:id', getUser);
// POST ROUTES for users
// POST a user
router.post('/adduser', addUser);
// PUT ROUTES for users
// PUT a user
router.put('/updateuser/:id', updateUser);
// DELETE ROUTES for users
// DELETE a user
router.delete('/deleteuser/:id', deleteUser);

router.get('/me', verifyToken, myInfo)
router.get('/children-activities', verifyToken, getUserAndChildren)


module.exports = router;
