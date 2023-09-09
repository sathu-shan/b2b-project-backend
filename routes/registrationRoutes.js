const express = require('express');
const { registerCompany, getCompanyStatistics, registerInvestor } = require('../controllers/registrationController');

const router = express.Router();

router.post('/investor', registerInvestor);
router.post('/company', registerCompany);

router.get('/companies/statistics', getCompanyStatistics);


module.exports = router;
