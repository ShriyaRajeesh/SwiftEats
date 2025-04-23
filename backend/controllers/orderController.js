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
    const userId = req.params.userId;
  
    try {
      const orders = await Order.find({ userId: userId });
      if (orders.length === 0) {
        return res.status(200).json([]); // Empty array if no orders found
      }
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Error fetching orders' });
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
        const status = req.query.status; // Get the status from query parameters
        const orders = await Order.find({ status }); // Find orders with the provided status
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
