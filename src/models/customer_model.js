const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const { default: validator } = require('validator');


let customerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, 
    validate:{
      validator: validator.isEmail,
      message: 'Please enter a valid email',
      isAsync: false
  }},
  phone: {type: String, required: true},
  car: {type: mongoose.Schema.Types.ObjectId, ref: "carModel", required: true},
});

customerSchema.plugin(idValidator, {
  message: "Car ID not valid",
  allowDuplicates: true
});


const customerModel = mongoose.model('customerModel', customerSchema);

module.exports = customerModel;