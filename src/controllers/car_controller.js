const carModel = require('../models/car_model');


///// ERROR HANDLER /////

function errorHandler(err, next, car) {
  if(err){
    console.log(err);
    return next(err);   
  }
  if(!car){
    const error = new Error('No existe');
    console.log(error);
    error.statusCode = 500;
    return next(error);
  }
}
exports.errorHandler = errorHandler;

///// SAVE CAR /////

function saveCar (req, res, next) {
  console.log(req.body);
  
  let car = {
    model: req.body.model,
    brand: req.body.brand,
    vin: req.body.vin,
    plate: req.body.plate,
    year: req.body.year,
    fuel: req.body.fuel,
  };
  
  let newCar = new carModel(car);

  newCar.save( (err, car, next) =>{

    if (err || !car) return errorHandler(err, car, next);

    res.json({
      ok: true,
      data: car
    });
  });
}

/// SHOW CAR ///

const showCar = (req, res, next) => {
  let id = req.params.id;
  
  carModel.findById( id, (err, car) => {

    if (err || !car) return errorHandler(err, next, car);
    
    res.json({
      ok: true,
      data: car
    });    

  });
}

/// SHOW CARS ////

function showCars (req, res, next) {

  carModel.find().exec((err, cars) => {
    if (err || !cars) return errorHandler(err, next, cars).lean();
    
    
    res.json({
      ok: true,
      data: cars
    })
  });
}

//// UPDATE CAR

function updateCar(req, res, next) {

  let id = req.params.id;
  let car = {
    model: req.body.model,
    brand: req.body.brand,
    vin: req.body.vin,
    plate: req.body.plate,
    year: req.body.year,
    fuel: req.body.fuel,
  };

  carModel.findByIdAndUpdate(id, car, { new: true }, (err, car) => {
    if (err || !car) return errorHandler(err, next, car);

    res.json({
      ok: true,
      data: car
    })
  });
}

//// DELETE CAR

function deleteCar(req, res, next) {

  let id = req.params.id;

  carModel.findByIdAndRemove(id, (err, car) =>{
    if (err || !car) return errorHandler(err, next, car);

    res.json({
      ok: true,
      data: car
    })

  });
}

module.exports = { saveCar, showCar, showCars, updateCar, deleteCar };