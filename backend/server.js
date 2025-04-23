const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require('./routes/orderRoutes');
const deliveryAgentRoutes = require('./routes/deliveryAgentRoutes');
const routeRoutes = require('./routes/routeRoutes');  
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const adminRoutes = require('./routes/adminRoutes'); // ✅ Import admin routes
const adminAgentRoutes = require('./routes/adminAgentRoutes'); // ✅ NEW
const adminOrdersRoutes = require('./routes/adminOrders');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/agents', deliveryAgentRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/admin', adminRoutes); // ✅ Mount admin routes
app.use('/api/admin', adminAgentRoutes); // ✅ NEW
app.use('/api/adminOrders', adminOrdersRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
