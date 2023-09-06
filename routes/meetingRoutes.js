const express = require('express');
const { scheduleNewEvent, fetchAllMeetings, deleteScheduledMeeting,
    checkAvailableCompanies } = require('../controllers/meetingController');

const router = express.Router();

router.get('/', fetchAllMeetings);
router.delete('/:id', deleteScheduledMeeting);
router.post('/schedule', scheduleNewEvent);
router.get('/availability/company', checkAvailableCompanies);

module.exports = router;