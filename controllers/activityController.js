const {Activity} = require('../models/activity');

exports.listActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
