const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  first_name: String,
  last_name: String,
  department: String,
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const forgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  resetCode: {
    type: String,
    default: ''
  },
  resetCodeExpires: {
    type: Date,
    default: null
  }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
}); 

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


 function isSimilarPassword(currentPassword, newPassword) {
  // Simple similarity check: you can use more complex algorithms if needed
  // For this example, we'll check if the new password contains significant parts of the old password
  const minLength = 4; // Minimum length of substring to consider
  for (let i = 0; i <= currentPassword.length - minLength; i++) {
    const substring = currentPassword.substring(i, i + minLength);
    if (newPassword.includes(substring)) {
      return true;
    }
  }
  return false;
}
const User= mongoose.model('User', userSchema);
const forgotPasswordS = mongoose.model('forgotPasswordS',forgotPasswordSchema);
module.exports ={
  User,
  forgotPasswordS,
  isSimilarPassword
};
