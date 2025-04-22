const mongoose = require('mongoose');

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    restaurantId: { 
      type: String, 
      required: true, 
      unique: true // Ensures that the restaurantId is unique
    },
    name: { 
      type: String, 
      required: true 
    },
    location: String,
    cuisine: String,
    image: String // filename or URL
  },
  { 
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Export the model
module.exports = mongoose.model('Restaurant', restaurantSchema);
