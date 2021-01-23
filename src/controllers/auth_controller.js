const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');

/// SIGNUP

const signUp = async (req, res) => {
  

  const { name, email, password, rol } = req.body;
  
  if (!name || !email || !password) return res.status(400).json("please enter all fields neccesary");
  

  const newUser = new userModel({
    name,
    email,
    password: await userModel.encryptPassword(password),
    rol
  }); 
  

  const userSave = await newUser.save();
  if (!userSave) return res.status(400).json("user not created");
    
  const token = jwt.sign({id: userSave._id}, process.env.SECRET, 
    {
    expiresIn: process.env.TIME_TOKEN}
    );
  
  res.json({token});    
}  

/// SIGNIN

const signIn = async (req, res) => {
  
  const userSign = await userModel.findOne({email: req.body.email});
  if (!userSign) return res.status(400).json("User not exist");
  
  const matchPass = await userModel.matchPassword(req.body.password, userSign.password);
  if (!matchPass) return res.status(401).json("password invalid");

  const token = jwt.sign({id: userSign._id}, process.env.SECRET, 
    {
    expiresIn: process.env.TIME_TOKEN}
    );

  res.json({token});
}  

/// LOGOUT

const logOut = (req, res) => {
  const token = req.headers["authorization"];
  console.log(token);
  token.destroy();
  console.log(token);
  };


/// PROFILE 


module.exports = { signIn, signUp, logOut };