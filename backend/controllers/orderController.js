const Order = require('../models/order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View orders by user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign a delivery agent to an order
exports.assignDeliveryAgent = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryAgentId: req.body.deliveryAgentId },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// New method to get orders by status
exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query; // Extract the status from query parameters

    if (!status) {
      return res.status(400).json({ message: 'Status query parameter is required' });
    }

    // Find orders based on the status
    const orders = await Order.find({ status });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
