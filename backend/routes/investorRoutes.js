const express = require('express');
const {InvestorController,
     getInvestorStatistics,
     getInvestorDetails,
     getInvestorByFilter,
     getInvestorBySearch,
     approveInvestorRequest,
     getOneInvestorDetail,
     deleteInvestorRequest} = require('../controllers/investorController');

const router = express.Router();

router.post('/register', InvestorController.registerInvestor);
router.get('/investors/statistics', getInvestorStatistics);
router.get('/investors/details', getInvestorDetails);
router.get('/filter',getInvestorByFilter);
router.get('/search', getInvestorBySearch);
router.put('/request/:id', approveInvestorRequest);
router.get('/investor/:id', getOneInvestorDetail);
router.delete('/request/:id', deleteInvestorRequest);

module.exports = router;
