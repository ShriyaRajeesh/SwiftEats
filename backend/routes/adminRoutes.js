// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');

router.get('/users', getAllUsers);

module.exports = router;
