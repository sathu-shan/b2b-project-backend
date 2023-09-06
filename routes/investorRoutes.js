const express = require('express');
const { getInvestorStatistics, registerInvestor } = require('../controllers/investorController');

const router = express.Router();

router.post('/register', registerInvestor);
router.get('/investors/statistics', getInvestorStatistics);

module.exports = router;
