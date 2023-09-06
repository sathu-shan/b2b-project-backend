const express = require('express');
const {registerPart1,
     getCompanyStatistics,
    getAllCompanyList,
    getCompanyBySearch,
getCompanyByFilter,
getOneCompanyDetail,
approveCompanyRequest,
deleteCompanyRequest} = require('../controllers/registrationController'); // Import the registration controller functions

const router = express.Router();

// Route for registering part 1 data
router.post('/registercompany', registerPart1);
router.get('/companies/statistics', getCompanyStatistics);
router.get('/allCompany' , getAllCompanyList);
router.get('/search', getCompanyBySearch);
router.get('/filter', getCompanyByFilter);
router.get('/company/:id', getOneCompanyDetail);
router.put('/request/:id', approveCompanyRequest);
router.delete('/request/:id', deleteCompanyRequest);



module.exports = router;
