const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const {
	getAllChildren,
	getChild,
	addChild,
	updateChild,
	deleteChild,
	getChildSuggestion} = require('../controllers/childrenController');

// GET ROUTES for children
// GET all children
router.get('/getallchildren', getAllChildren);
// GET a child
router.get('/getchild/:id', getChild);
// GET a Suggestion for a childre
router.get('/search', getChildSuggestion);

// POST ROUTES for children
// POST a child
router.post('/addchild', addChild);

//PUT ROUTES for children
//PUT a child
router.put('/updatechild/:id', updateChild);

// DELETE ROUTES for children
// DELETE a child
router.delete('/deletechild/:id', deleteChild);

module.exports = router;
