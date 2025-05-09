const express = require('express');
const { bookActivity, getMyBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.post('/book',  [check('activityId', 'Activity ID is required').not().isEmpty()],authMiddleware, bookActivity);
router.get('/my-bookings', authMiddleware, getMyBookings);

module.exports = router;
