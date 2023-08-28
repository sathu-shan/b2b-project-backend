const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();


router.post('/login' , UserController.login);
router.get('/verify' , UserController.verify);


module.exports = router;
