const express = require('express');
const { listActivities } = require('../controllers/activityController');
const router = express.Router();

// const {Activity }= require('../models/activity');

// Add this in activityRoutes.js temporarily
// router.post('/activities', async (req, res) => {
//     const { title, description, location, date, time } = req.body;
//     const activity = new Activity({ title, description, location, date, time });
//     console.log(activity);
//    const createActivities =  await activity.save();
//    console.log(createActivities);
//     res.status(201).json(activity);
//   });
  
router.get('/activities',listActivities);

module.exports = router;
