const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET /api/adminOrders - Get all orders with optional status and date filters
router.get('/', async (req, res) => {
  try {
    const { status, dateFrom, dateTo } = req.query;

    const query = {};

    if (status) query.status = status;

    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders for admin:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
