const express = require('express');
const { 
    registerPart1
} = require('../controllers/registrationController'); // Import the registration controller functions

const router = express.Router();

// Route for registering part 1 data
router.post('/registercompany', registerPart1);


module.exports = router;
