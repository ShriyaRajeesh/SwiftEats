// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Storing plain text password
  role: { 
    type: String, 
    enum: ['Customer', 'DeliveryAgent', 'Admin'], // Updated enum values
    default: 'Customer' // Default role
  },
  phone: String,
  address: String
});

module.exports = mongoose.model('User', userSchema);