const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json("token empty");

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    
    const user = await userModel.findById(req.userId, {password: 0});
    if (!user) return res.status(404).json('User not exist');
    next();
  } catch (error) {
    return res.status(401).json('Unauthorized');
  }
};

const isAdmin = async (req, res, next) => {
  const user = await userModel.findById(req.userId);
    if (user.rol === 'admin'){
      next();
    }else{ 
      res.status(401).json('permission denied');
    }
  };



//   try {
//     const user = await userModel.findById(req.userId);
//     if (user.rol === 'admin'){
//       next();
//     } 
//   } catch (error) {
//     res.json('Only admin functions'); 
//     }
// };


module.exports = { verifyToken, isAdmin };