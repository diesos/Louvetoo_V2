const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const { protectRoute } = require('../auth');

router.get('/dashboard', protectRoute, dashboardController.dashboardView);

module.exports = router;
