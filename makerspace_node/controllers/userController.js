const { User, isSimilarPassword, forgotPasswordS } = require('../models/userModel');

const jwt = require("jsonwebtoken");
const key = require("../config/secret");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { passwordSchema } = require('../models/zod');
const { transporter } = require('../service/mailService');
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
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

exports.updatepassword = async (req, res) => {

  try {
    const payload = req.headers.authorization;
    const { password, newPassword } = req.body;
    const parsedPassword = passwordSchema.safeParse(newPassword);
    const email = jwt.verify(payload, key);
    const user = await User.findOne({ email });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, msg: "You have entered wrong current password" });

    }

    if (!parsedPassword.success) {
      res.json({
        success: false, msg: "Password must contain at least one uppercase letter and one special character."
      })
      return;
    }

    const newPassMatchOldPass = await user.comparePassword(newPassword);
    if (newPassMatchOldPass) {
      res.json({ success: false, msg: "The new password already exists! Try another one" })
      return;
    }

    if (isSimilarPassword(password, newPassword)) {
      return res.json({ success: false, msg: "The new password is too similar to the current password! Try another one" });
    }



    user.password = newPassword; // This triggers the pre-save hook
    await user.save();
    res.json({ success: true, msg: "Password updated successfully" })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false, msg: 'An error occurred while processing your request'
    })
  }
}

exports.checkEmailAccount = async (req, res) => {

  const { email } = req.body;
  const user = await User.findOne({ email });
  // console.log(user._id.toString());
  const userFound = Boolean(user);
  if (!userFound) {
    return res.status(400).json({ success: false, msg: 'User not found' });
  }

  const Fkey = jwt.sign(user._id.toString(), key);
  let resetCode = crypto.randomInt(100000, 999999).toString();
  let resetCodeExpires = Date.now() + 300000;

  const forgotPasswordEntry = await forgotPasswordS.findOne({ email });
  if (forgotPasswordEntry) {
    // Update existing entry
    forgotPasswordEntry.resetCode = resetCode;
    forgotPasswordEntry.resetCodeExpires = resetCodeExpires
    await forgotPasswordEntry.save();
  } else {
    const fp = new forgotPasswordS();
    fp.email = email;
    fp.resetCode = resetCode;
    fp.resetCodeExpires = resetCodeExpires;
    await fp.save();
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is ${resetCode}`
  });


  res.status(200).json({ success: true, Fkey: Fkey, msg: 'Reset code sent to your email' });

}

exports.forgotpassword = async (req, res) => {

  const payload = req.headers.authorization;
  const { newPassword } = req.body;
  const parsedPassword = passwordSchema.safeParse(newPassword);
  const _id = jwt.verify(payload, key);
  const user = await User.findOne({ _id });
  const userFound = Boolean(user);
  if (!userFound) {
    return res.status(400).json({ success: false, msg: 'User not found' });
  }

  if (!parsedPassword.success) {
    res.json({
      success: false, msg: "Password must contain at least one uppercase letter and one special character."
    })
    return;
  }

  const newPassMatchOldPass = await user.comparePassword(newPassword);
  // console.log(newPassMatchOldPass) it gives you true or false
  if (newPassMatchOldPass) {
    res.json({ success: false, msg: "The new password already exists! Try another one" })
    return;
  }

  user.password = newPassword;
  user.updated_at = Date.now(); // This triggers the pre-save hook
  await user.save();

  res.status(200).json({success:true,msg:" Your password has been successfully updated "});

}

exports.emailVerification = async (req, res) => {
  const { email, resetCode } = req.body;

  const user = await User.findOne({ email });
  const userF = Boolean(user);
  if (!userF) {
    return res.status(400).json({ success: false, msg: 'User not found' });
  }
  // const newPassMatchOldPass = await user.comparePassword(newPassword);
  // // console.log(newPassMatchOldPass) it gives you true or false
  // if (newPassMatchOldPass) {
  //   res.json({ success: false, msg: "The new password already exists! Try another one" })
  //   return;
  // }

  const foundInForgetPass = await forgotPasswordS.findOne({
    email,
    resetCode,
    resetCodeExpires: { $gt: Date.now() } // Check if the code is still valid
  });

  const userFound = Boolean(foundInForgetPass);
  if (!userFound) {
    return res.status(400).json({ success: false,msg: 'Invalid verification code' });
  }


  res.json({ success: true, msg: "Your email has successfully verified" })


}

exports.updateNames = async (req, res) => {

  try {
    const update = {};
    const payload = req.headers.authorization;
    const email = jwt.verify(payload, key);
    const { firstName, lastName } = req.body;

    if (firstName !== undefined && firstName !== "") {
      update.first_name = firstName;
    }
    if (lastName !== undefined && lastName !== "") {
      update.last_name = lastName;
    }
    if (Object.keys(update).length === 0) {
      throw new Error('No fields to update');
    }

    const user = await User.updateOne({ email }, update);
    console.log(user);


    if (user.acknowledged) {
      res.json({ success: true, msg: "Names have been successfully updated " });
    } else {
      res.json({ success: false, msg: "Unable to update names " });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false, msg: 'An error occurred while processing your request'
    })
  }

}

exports.userDetails = async (req, res) => {
  try {

    const payload = req.headers.authorization;
    const email = jwt.verify(payload, key);
    const user = await User.findOne({ email });
    console.log(user);
    const userFound = Boolean(user);
    if (userFound) {
      res.status(200).json({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      })

    } else {
      res.status(404).json({
        msg: " Didn't find the user "
      })
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
