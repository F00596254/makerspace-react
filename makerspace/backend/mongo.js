const mongoose=require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.Database_URL).then(() => {
    console.log('Connected to MongoDB');
   
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

  let userSchema= new mongoose.Schema({
    username:String,
    email:String,
    first_Name:String,
    last_Name:String,
    password:String,
    created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: {
        type: Date,
        default: Date.now
      }
     
})


const User=mongoose.model("User",userSchema);

// eslint-disable-next-line no-undef
module.exports={
    User
}