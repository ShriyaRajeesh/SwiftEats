const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes (to be added later)
app.use('/api/auth', require('./routes/authRoutes'));



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/SwiftEats').then(() => {
  console.log("MongoDB connected");
  app.listen(3001, () => console.log(`Server running on port ${3001}`));
}).catch(err => console.error(err));
