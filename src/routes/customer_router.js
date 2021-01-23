const express = require('express');
const router = express.Router();

const { saveCustomer, showCustomer, showCustomers, updateCustomer, deleteCustomer } = require('../controllers/customer_controller');
const { verifyToken, isAdmin } = require('../middlewares/authMDW');

router.post("/customersave", [verifyToken, isAdmin], saveCustomer);
router.get("/show/:id", [verifyToken],showCustomer);
router.get("/customers", [verifyToken],showCustomers);
router.put("/update/:id", [verifyToken, isAdmin],updateCustomer);
router.delete("/delete/:id", [verifyToken, isAdmin],deleteCustomer);

module.exports = router;