const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const orderRoutes = require('./routes/orderRoutes');
const deliveryAgentRoutes = require('./routes/deliveryAgentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const restaurantRoutes=require('./routes/restaurantRoutes');
const menuRoutes=require('./routes/menuRoutes');





app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/restaurants',restaurantRoutes);
app.use('/api/menus',menuRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/deliveryagents', deliveryAgentRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
