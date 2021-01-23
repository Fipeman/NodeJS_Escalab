const express = require('express');
const router = express.Router();

const { saveCar, showCar, showCars, updateCar, deleteCar } = require('../controllers/car_controller');
const { verifyToken, isAdmin } = require('../middlewares/authMDW');

router.post("/carsave",  [verifyToken, isAdmin] ,saveCar);
router.get("/show/:id",  [verifyToken] ,showCar);
router.get("/cars",  [verifyToken] ,showCars);
router.put("/update/:id",  [verifyToken, isAdmin] ,updateCar);
router.delete("/delete/:id",  [verifyToken, isAdmin] ,deleteCar);

module.exports = router;
