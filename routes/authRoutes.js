const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', AuthController.registerUser); // Use registerUser here

module.exports = router;
