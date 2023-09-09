const express = require('express');
const { getTotalNumberOfInvestors, getTotalNumberOfCompany, getAllCompaniesTypesAndStat, getAllInvestorsTypesAndStat, 
    getInvestorTypesAndStat, getCompanyTypesAndStat } = require('../controllers/dashController');

const router = express.Router();

router.get('/investors/total', getTotalNumberOfInvestors);
router.get('/investors/categories', getAllInvestorsTypesAndStat);
router.get('/investors/type', getInvestorTypesAndStat);

router.get('/companies/total', getTotalNumberOfCompany);
router.get('/companies/categories', getAllCompaniesTypesAndStat);
router.get('/companies/type', getCompanyTypesAndStat);

module.exports = router;