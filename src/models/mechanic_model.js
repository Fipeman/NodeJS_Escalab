const mongoose = require('mongoose');

let mechanicSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Error: name required"], unique: [true, "Error: not allow duplicate mechanic"]},
  available: {type: Boolean, required: [true, "Error: required status availability"]},
});

const mechanicModel = mongoose.model('mechanicModel', mechanicSchema);

module.exports = mechanicModel;