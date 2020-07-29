const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { auth } = require('../middleware/auth');

//=======================================
//             User Router
//=======================================

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/auth', auth, userController.authUser);

module.exports = router;