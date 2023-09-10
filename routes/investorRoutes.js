const express = require('express');
const { getAllInvestors, searchInvestors, filterInvestors, getAllInvestorCount, acceptRequest, rejectRequest, getSingleInvestor
 } = require('../controllers/investorController');

const router = express.Router();

router.get('/', getAllInvestors);
router.get('/search', searchInvestors);
router.get('/filter', filterInvestors);
router.get('/count', getAllInvestorCount);
router.get('/approve/:id', acceptRequest);
router.get('/reject/:id', rejectRequest);
router.get('/:id', getSingleInvestor);

module.exports = router;
