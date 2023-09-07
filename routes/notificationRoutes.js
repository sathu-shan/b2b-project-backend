const express = require('express');
const { createNewNotification, getAllNotificationsAccordingToUser } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', getAllNotificationsAccordingToUser);
router.post('/create', createNewNotification);

module.exports = router;