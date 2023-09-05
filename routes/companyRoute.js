const express = require('express');

const { getAllCompanyList, getOneCompanyDetail, approveCompanyRequest, deleteCompanyRequest, getCompanyBySearch,
    getCompanyByFilter } = require('../controllers/companyController');

const router = express.Router();

router.get('/' , getAllCompanyList);
router.get('/search', getCompanyBySearch);
router.get('/filter', getCompanyByFilter);
router.get('/:id', getOneCompanyDetail);
router.put('/request/:id', approveCompanyRequest);
router.delete('/request/:id', deleteCompanyRequest);

module.exports = router;
