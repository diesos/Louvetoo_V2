const express = require('express');
const router = express.Router();
const {adminAssociateChild } = require('../controllers/adminController');

router.post('/associate-child', adminAssociateChild);

module.exports = router;
