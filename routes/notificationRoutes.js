const express = require('express');
const { createNewNotification, getAllNotificationsAccordingToUser, markAsViewed, markAsReaded } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', getAllNotificationsAccordingToUser);
router.post('/create', createNewNotification);
router.post('/markAsViewed', markAsViewed);
router.post('/markAsReaded', markAsReaded);

module.exports = router;