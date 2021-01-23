const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');

///// ERROR HANDLER /////


function errorHandler(error, res) {
  if (error.name === "ValidationError"){
    const errors = {};
    Object.keys(error.errors).forEach((key) =>{
      errors[key] = error.errors[key].message;
    });
    return res.status(400).send(errors);
  }
  if (error.name === 'MongoError' || error.name === 'CastError');
  res.status(500).send(error.message);
};


/// CREATE USER

const saveUser = async (req, res, error) => {
  
  const { name, email, password, rol } = req.body;
  
  if (!name || !email || !password) return res.status(400).json("please enter all fields neccesary");
  

  const newUser = new userModel({
    name,
    email,
    password: await userModel.encryptPassword(password),
    rol
  }); 
  
  newUser.save((err, user) =>{

    if (err) return errorHandler(err, res);

    res.json(user);
    console.log("user created");
  });
}

/// SHOW USER

const showUser = (req, res, error) => {
  let id = req.params.id;
  
  userModel.findById( id, (error, user) => {

    if (error) return errorHandler(error, user);
    if(user === null) return res.status(400).json("user ID not valid")
    res.json(user);    

  });
}

/// SHOW USERS

function showUsers (req, res) {

  userModel.find().where({rol: 'user'}).exec((err, users) => {
    if (err || !users) return errorHandler(err, next, users).lean();
    
    
    res.json({
      ok: true,
      data: users
    })
  });
}
/// UPDATE USER

const updateUser = async (req, res) => {

  let id = req.params.id;
  const { rol, name, email, password } = req.body;

    await userModel.findByIdAndUpdate(id, {rol, name, email, password:await userModel.encryptPassword(password) }, { new: true }, (error, user) => {
    if (error || !user) return errorHandler(error, user);
    
    res.json({
      ok: true,
      data: user
    });
  });
}

/// DELETE USER

function deleteUser(req, res, next) {

  let id = req.params.id;

  userModel.findByIdAndRemove(id, (err, user) =>{
    if (err || !user) return errorHandler(err, next, user);

    res.json({
      ok: true,
      data: user
    });
  });
}

module.exports = { saveUser, showUser, showUsers, updateUser, deleteUser };