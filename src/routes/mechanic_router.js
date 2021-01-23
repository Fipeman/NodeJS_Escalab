const express = require('express');
const router = express.Router();

const { saveMechanic, showMechanic, showMechanics, updateMechanic, deleteMechanic } = require('../controllers/mechanic_controller');
const { verifyToken, isAdmin } = require('../middlewares/authMDW');

router.post("/save", [verifyToken, isAdmin] ,saveMechanic);
router.get("/show/:id", [verifyToken],showMechanic);
router.get("/mechanics", [verifyToken],showMechanics);
router.put("/update/:id", [verifyToken, isAdmin],updateMechanic);
router.delete("/delete/:id", [verifyToken, isAdmin],deleteMechanic);

module.exports = router;
