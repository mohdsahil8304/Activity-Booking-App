const {Booking} = require('../models/booking');
const {Activity} = require('../models/activity');
const {User} = require('../models/user');

exports.bookActivity = async (req, res) => {
  const { activityId } = req.body;
  try {
    const user = await User.findById(req.userId);  // Extracted from JWT token
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ msg: 'Activity not found' });

    let booking = new Booking({
      user: user._id,
      activity: activity._id
    });

    await booking.save();
    res.status(201).json({ msg: 'Activity booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('activity');
    if (!bookings) return res.status(404).json({ msg: 'No bookings found' });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
