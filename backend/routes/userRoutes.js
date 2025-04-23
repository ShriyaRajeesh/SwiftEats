const express = require('express');
const router = express.Router();
const { getUserById, getUserByEmail, createUser, updateUser } = require('../controllers/userController');

// Route to get user by userId
router.get('/:userId', getUserById);

// Route to get user by email
router.get('/email/:email', getUserByEmail);

// Route to create a new user (sign up)
router.post('/', createUser);

// Route to update user details by userId
router.patch('/:userId', updateUser);

module.exports = router;
