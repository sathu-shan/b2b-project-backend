const express = require('express');
const {InvestorController, getInvestorStatistics} = require('../controllers/investorController');

const router = express.Router();

router.post('/register', InvestorController.registerInvestor);
router.get('/investors/statistics', getInvestorStatistics);

module.exports = router;
