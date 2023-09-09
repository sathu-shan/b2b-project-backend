const express = require('express');
const { getAllInvestors, searchInvestors, filterInvestors, getAllInvestorCount } = require('../controllers/investorController');

const router = express.Router();

router.get('/', getAllInvestors);
router.get('/search', searchInvestors);
router.get('/filter', filterInvestors);
router.get('/count', getAllInvestorCount);

module.exports = router;
