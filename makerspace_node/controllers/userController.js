const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const newUser = new User({ email, password, first_name, last_name });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(200).json({ authenticated: false });
    }
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(200).json({ authenticated: false });
    }
    res.status(200).json({ authenticated: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};