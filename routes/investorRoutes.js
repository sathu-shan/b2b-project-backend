const express = require('express');
const InvestorController = require('../controllers/investorController');

const router = express.Router();

router.post('/register', InvestorController.registerInvestor);

module.exports = router;
