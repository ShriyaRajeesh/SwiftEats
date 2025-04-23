const express = require('express');
const router = express.Router();
const { addRestaurant, getRestaurant, getRestaurantById } = require('../controllers/restaurantController');

// POST route to add a new restaurant
router.post('/', addRestaurant);

// GET route to get all restaurants
router.get('/', getRestaurant);

// GET route to get a restaurant by restaurantId
router.get('/:restaurantId', getRestaurantById);

module.exports = router;
