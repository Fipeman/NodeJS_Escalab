const bcrypt = require('bcryptjs');

const userModel = require('../models/user_model');

const firstAdmin = async () => {

  const userAdmin = await userModel.findOne({email: "admin@admin.cl"})

  if (!userAdmin) {
  const newAdmin = new userModel({
    name: 'mainAdmin',
    email: 'admin@admin.cl',
    password: await bcrypt.hashSync('admin', 10 ),
    rol: 'admin'
   });
   const mainAdmin = await newAdmin.save();
   console.log('Main admin created');
  }
};

module.exports = {firstAdmin};