const { User } = require('../models/userModel');
const key = require("../config/secret");
const jwt = require("jsonwebtoken");
exports.adminEditable = async (res, req) => {

    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's information
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }

}

exports.getAllUsers = async (req, res) => {

    const payload = req.headers.authorization;
    const allUsers = await User.find({}).select('email first_name last_name');

    // const _id = jwt.verify(payload, key);
    // const user = await User.findOne({ email });
    // console.log(user);
    // const userFound = Boolean(user);
    // if(!userFound){ 
    //     return res.json({
    //         msg:"User not found "
    //     })
    // }
    res.json({
        Users: allUsers
    })

}

exports.getUserById = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(req.params.id)
        const user = await User.findById(_id).select('email first_name last_name');
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const update = {};
        const _id = req.params.id;
        const { email, firstName, lastName } = req.body;

        if (email && email.trim()) {
            update.email = email;
        }
        
        if (firstName && firstName.trim()) {
            update.first_name = firstName;
        }
        
        if (lastName && lastName.trim()) {
            update.last_name = lastName;
        }
          
        
        if (Object.keys(update).length === 0) {
            throw new Error('No fields to update');
        }
        console.log(update);
        const user = await User.findByIdAndUpdate(
            _id,
            update,
        ) 

        res.json({
            success: true,
            msg: "User updated successfully"
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};