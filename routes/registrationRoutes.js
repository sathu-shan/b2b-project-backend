const express = require('express');
const {registerPart1, getCompanyStatistics} = require('../controllers/registrationController'); // Import the registration controller functions

const router = express.Router();

// Route for registering part 1 data
router.post('/registercompany', registerPart1);
router.get('/companies/statistics', getCompanyStatistics);



module.exports = router;
