const express = require('express');
const { scheduleNewEvent, fetchAllMeetings, deleteScheduledMeeting } = require('../controllers/meetingController');

const router = express.Router();

router.get('/', fetchAllMeetings);
router.delete('/:id', deleteScheduledMeeting);
router.post('/schedule', scheduleNewEvent);

module.exports = router;