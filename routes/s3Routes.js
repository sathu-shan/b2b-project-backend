const express = require('express');
const upload = require('../controllers/s3Controller');

const router = express.Router();

// Route for registering part 1 data
router.post('/upload', upload);


module.exports = router;
