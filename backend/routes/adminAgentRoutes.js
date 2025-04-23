const express = require('express');
const router = express.Router();
const adminAgentController = require('../controllers/adminAgentController');

router.get('/agents', adminAgentController.getAllAgents);
router.get('/agents/stats', adminAgentController.getAgentStats);
router.patch('/agents/:id', adminAgentController.updateAgentStatus);

module.exports = router;
