// const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const { validationResult } = require('express-validator');
const dotenv = require("dotenv");
const cookie = require("cookie-parser");
dotenv.config({ path: "./.env" });


// Register User
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phoneNumber, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      name : name,
      email : email,
      phoneNumber : phoneNumber,
      password : password
    });
  const createUser =  await user.save();
  console.log(createUser);
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email : email });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
   return res.json({
    success: 1,
    message: "login successfully",
    token: token,
});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
