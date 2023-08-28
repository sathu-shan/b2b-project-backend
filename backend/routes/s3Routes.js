const express = require('express');
const upload= require('../controllers/s3Controller'); // Import the registration controller functions

const router = express.Router();

// Route for registering part 1 data
router.post('/upload', upload);


module.exports = router;