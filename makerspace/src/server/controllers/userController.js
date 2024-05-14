const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    const { id, email, password, name, department } = req.body;
    const newUser = new User({ id, email, password, name, department });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
