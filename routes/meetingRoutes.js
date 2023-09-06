const express = require('express');
const { scheduleNewEvent, fetchAllMeetings, deleteScheduledMeeting,
    checkAvailableCompanies, checkAvailableInvestors, checkAvailableRooms } = require('../controllers/meetingController');

const router = express.Router();

router.get('/', fetchAllMeetings);
router.delete('/:id', deleteScheduledMeeting);
router.post('/schedule', scheduleNewEvent);
router.get('/availability/company', checkAvailableCompanies);
router.get('/availability/investor', checkAvailableInvestors);
router.get('/availability/room', checkAvailableRooms);

module.exports = router;