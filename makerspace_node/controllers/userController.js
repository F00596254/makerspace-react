const User = require('../models/userModel');
const jwt=require("jsonwebtoken");
const key= require("../config/secret");
exports.signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const newUser = new User({ email, password, first_name, last_name });
    await newUser.save();
    console.log(newUser.email);
    const token=jwt.sign(newUser.email,key);
    res.status(201).json({ success:true,token:token , message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, msg: 'An error occurred while processing your request' });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({email});

    // console.log(user);
    let userFound=Boolean(user);
   
    if (!userFound) {
        return res.status(200).json({ success: false });
    }
    console.log(user.email);
    const token=jwt.sign(user.email,key);
     
    const isPasswordValid = await user.comparePassword(password);
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
        return res.status(200).json({ success: false ,token:token ,msg:"You have entered the wrong password"});
    }
    res.status(200).json({ success: true,token:token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

exports.userDetails = async (req,res)=> {
      try{

        const payload=req.headers.authorization;
        const email= jwt.verify(payload,key);
        const user=await User.findOne({email});
        console.log(user);
        const userFound=Boolean(user);
        if(userFound){
            res.status(200).json({
              email:user.email,
              firstName:user.first_name,
              lastName:user.last_name,
            })

        }else{ 
          res.status(404).json({
            msg:" Didn't find the user "
          })
        }
      }catch(error){
        console.error(error);
        res.status(500).json({
          success:false, msg: 'An error occurred while processing your request' 
        })
      }
}