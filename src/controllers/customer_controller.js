const customerModel = require('../models/customer_model');

///// ERROR HANDLER /////

function errorHandler(err, next, customer) {
  if(err){
    console.log(err);
    return next(err);   
  }
  if(!customer){
    const error = new Error('please check the fields input');
    console.log(error);
    
    error.statusCode = 500;
    return next(error);
  }
}


///// SAVE CUSTOMER /////

function saveCustomer (req, res, next) {
  console.log(req.body);
  
  let customer = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    car: req.body.car
  };
  
  let newCustomer = new customerModel(customer);

  newCustomer.save( (err, customer) =>{

    if (err || !customer) return errorHandler(err, customer, next);

    res.json({
      ok: true,
      data: customer
    });

  });
}

/// SHOW CUSTOMER ///

const showCustomer = (req, res, next) => {
  let id = req.params.id;
  
  customerModel.findById(id).populate('car').exec(function(err, customer) {

    if (err || !customer) return errorHandler(err, next, customer);
    
    res.json({
      ok: true,
      data: customer
    });    
  });
}

/// SHOW CUSTOMERS ///

function showCustomers (req, res, next) {

  customerModel.find().populate('car').exec((err, customers) => {
    if (err || !customers) return errorHandler(err, next, customers);
    
    res.json({
      ok: true,
      data: customers
    });
  });
}

//// UPDATE CUSTOMER

function updateCustomer(req, res, next) {

  let id = req.params.id;
  let customer = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    car: req.body.car
  };

  customerModel.findByIdAndUpdate(id, customer, { new: true }, (error, customer) => {
    if (error || !customer) return errorHandler(error, next, customer);

    res.json({
      ok: true,
      data: customer
    })
  });
}

//// DELETE CUSTOMER

function deleteCustomer(req, res, next) {

  let id = req.params.id;

  customerModel.findByIdAndDelete(id, (err, customer) =>{
    if (err || !customer) return errorHandler(err,next ,customer);

    res.json({
      ok: true,
      data: customer
    })

  });
}

module.exports = { saveCustomer, showCustomer, showCustomers, updateCustomer, deleteCustomer };
