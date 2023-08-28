const express = require('express');
const AuthController = require('../controllers/authController'); // Use Sequelize AuthController

const router = express.Router();

router.post('/signup', AuthController.registerUser);

module.exports = router;
