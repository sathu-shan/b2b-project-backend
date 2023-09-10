const express = require('express');
const { signUpUser, loginUser, getOneUser, changeUserPassword } = require('../controllers/authController'); // Use Sequelize AuthController

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/info/:id', getOneUser);
router.post('/password', changeUserPassword);

module.exports = router;
