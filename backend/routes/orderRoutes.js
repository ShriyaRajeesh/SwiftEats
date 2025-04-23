const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to place an order
router.post('/', orderController.placeOrder);

// Route to get orders by userId
router.get('/user/:userId', orderController.getUserOrders);

// Route to assign a delivery agent to an order
router.patch('/:id/assign', orderController.assignDeliveryAgent);

// Route to update the status of an order
router.patch('/:id/status', orderController.updateOrderStatus);

// New route to fetch orders based on status
router.get('/', orderController.getOrdersByStatus); // This will handle the status query parameter

module.exports = router;
