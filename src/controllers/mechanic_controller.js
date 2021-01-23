const mechanicModel = require('../models/mechanic_model');


///// ERROR HANDLER /////

// function errorHandler(err, next, mechanic) {
//   if(err){
//     console.log(err);
//     return next(err); 
//   }
//   next();
//   if(!mechanic){
//     const error = new Error('Please check the fields input');
//     console.log(error);
//     error.statusCode = 500;
//     return next(error);
//   }
// }


function errorHandler2(error, res) {
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



///// SAVE mechanic /////

function saveMechanic (req, res) {
  console.log(req.body);
  
  let mechanic = {
    name: req.body.name,
    available: req.body.available,
  };
  
  let newMechanic = new mechanicModel(mechanic);

  newMechanic.save( (error, mechanic) =>{

    if (error) return errorHandler2(error, res);
    res.json(mechanic);
    console.log("Mechanic created");
  });
}

/// SHOW mechanic ///

const showMechanic = (req, res, next) => {
  let id = req.params.id;
  
 mechanicModel.findById( id, (err, mechanic) => {

    if (err) return errorHandler2(err, res);
    
    res.json({
      ok: true,
      data: mechanic
    });    

  });
}

/// SHOW mechanicS ////

function showMechanics (req, res) {

 mechanicModel.find().exec((err, mechanics) => {
    if (err) return errorHandler(err, mechanics);
    
    res.json({
      ok: true,
      data: mechanics
    });
  });
}

//// UPDATE mechanic

function updateMechanic(req, res) {

  let id = req.params.id;
  let mechanic = {
    name: req.body.name,
    available: req.body.available,
  };

 mechanicModel.findByIdAndUpdate(id, mechanic, { new: true }, (err, mechanic) => {
    if (err) return errorHandler2(err, res);

    res.json({
      ok: true,
      data: mechanic
    })
  });
}

//// DELETE mechanic

function deleteMechanic(req, res, next) {

  let id = req.params.id;

 mechanicModel.findByIdAndRemove(id, (err, mechanic) =>{
    if (err) return errorHandler2(err, res);

    res.json({
      ok: true,
      data: mechanic
    })

  });
}

module.exports = { saveMechanic, showMechanic, showMechanics, updateMechanic, deleteMechanic };