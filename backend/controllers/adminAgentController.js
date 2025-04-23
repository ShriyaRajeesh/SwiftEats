const User = require('../models/User');

// GET all delivery agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'DeliveryAgent' });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET delivery agent stats
exports.getAgentStats = async (req, res) => {
  try {
    const agents = await User.find({ role: 'DeliveryAgent' });
    const totalAgents = agents.length;
    const activeAgents = agents.filter(agent => agent.active).length;
    const totalRatings = agents.reduce((sum, a) => sum + (a.rating || 0), 0);
    const averageRating = totalAgents > 0 ? totalRatings / totalAgents : 0;

    res.json({ totalAgents, activeAgents, averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// PATCH update agent status
exports.updateAgentStatus = async (req, res) => {
  try {
    const agent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};
