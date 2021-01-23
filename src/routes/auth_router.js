const express = require('express');
const router = express.Router();

const { signIn, signUp, logOut } = require('../controllers/auth_controller');
const { verifyToken, isAdmin } = require('../middlewares/authMDW');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/logout',verifyToken, logOut);

module.exports = router;