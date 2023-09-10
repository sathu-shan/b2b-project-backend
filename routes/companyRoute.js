const express = require('express');

const { getAllCompanyList, getOneCompanyDetail, approveCompanyRequest, deleteCompanyRequest, getCompanyBySearch,
    getCompanyByFilter, getAllCompaniesCount } = require('../controllers/companyController');

const router = express.Router();

router.get('/' , getAllCompanyList);
router.get('/search', getCompanyBySearch);
router.get('/filter', getCompanyByFilter);
router.get('/count', getAllCompaniesCount);
router.get('/approve/:id', approveCompanyRequest);
router.get('/reject/:id', deleteCompanyRequest);
router.get('/:id', getOneCompanyDetail);

module.exports = router;
