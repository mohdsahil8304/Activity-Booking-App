const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
        minLength: 3,
      },
      email: {
        type: String,
        required: true,
        // unique : [true,"Email id already present"],
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
          }
        },
      },
      phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        min: 10,
      },
  password: { type: String, required: true }
});

// Hash password before saving to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = new mongoose.model('User', UserSchema);

module.exports = {User};
