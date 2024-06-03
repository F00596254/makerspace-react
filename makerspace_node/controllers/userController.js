const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const key = require("../config/secret");
exports.signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const newUser = new User({ email, password, first_name, last_name });
    await newUser.save();
    const token = jwt.sign(newUser.email, key);
    req.session.isLoggedIn = true;
    res
      .status(201)
      .json({
        success: true,
        token: token,
        message: "User created successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        msg: "An error occurred while processing your request",
      });
  }
};

exports.signin = async (req, res) => {
  try {
    req.session.isLoggedIn = true;
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    let userFound = Boolean(user);

    if (!userFound) {
      return res.status(200).json({ success: false });
    }

    const token = jwt.sign(user.email, key);

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(200)
        .json({
          success: false,
          token: token,
          msg: "You have entered the wrong password",
        });
    }
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const email = jwt.verify(token, key);
    const user = await User.findOne({ email });
    const userFound = Boolean(user);
    if (userFound) {
      res.status(200).json({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      });
    } else {
      res.status(404).json({
        msg: " Didn't find the user ",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while processing your request",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.isLoggedIn = false;
    req.session.destroy((err) => {
      if(err) throw err;
    });
    res.status(200).json({
      success: true,
      msg: "User logged out.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while processing your request",
    });
  }
};
