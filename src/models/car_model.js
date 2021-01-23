const mongoose = require('mongoose');

let carSchema = new mongoose.Schema(
  {
  model: {type: String, required: true},
  brand: {type: String, required: true},
  vin: {type: String, required: true},
  plate: {type: String, required: true},
  year: {type: Number, required: true},
  fuel: {type: String, required: true},
});

const carModel = mongoose.model('carModel', carSchema);

module.exports = carModel;