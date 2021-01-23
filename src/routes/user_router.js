const express = require('express');
const router = express.Router();

const { saveUser, showUser, showUsers, updateUser, deleteUser } = require('../controllers/user_controller');
const { verifyToken, isAdmin } = require('../middlewares/authMDW');

router.post("/usersave", [verifyToken, isAdmin] ,saveUser);
router.get("/show/:id",[verifyToken, isAdmin] ,showUser);
router.get("/users", [verifyToken, isAdmin],showUsers);
router.put("/update/:id", [verifyToken, isAdmin],updateUser);
router.delete("/delete/:id", [verifyToken, isAdmin],deleteUser);

module.exports = router;