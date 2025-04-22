// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Email and password are required' 
    });
  }

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    console.log("Login successful. User role:", user.role);
    console.log("Token payload:", {
      userId: user._id,
      name: user.name,
      role: user.role,
      email: user.email
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // 2. Compare plain text passwords
    if (password !== user.password) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        name: user.name,
        role: user.role, // This will now be 'Admin', 'DeliveryAgent', or 'Customer'
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Send successful response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error during authentication' 
    });
  }
});

module.exports = router;