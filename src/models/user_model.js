const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { default: validator } = require('validator');


let userSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Error: Name user is required"]},
  email: {type: String, unique: true, required: [true, "Error: Email user is required"],
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email',
        isAsync: false
        }
      },
  password: {type: String, required: [true, "Error: Password user is required"]},
  rol:{
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
    required: [true, "Error: Role user is required"] 
    },
  });

  userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  return await bcrypt.hash(password, salt);
};

userSchema.statics.matchPassword = async (password, sendpassword) => {
  return await bcrypt.compare(password, sendpassword);
};


const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;