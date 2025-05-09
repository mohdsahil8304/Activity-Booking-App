const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Phone Number is required').isMobilePhone().not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }).not().isEmpty()
  ],
  registerUser
);

router.post('/login',[
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty()
], loginUser);

module.exports = router;
