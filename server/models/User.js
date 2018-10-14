const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minLenght: 6
  },
  name: {
    type: String,
    maxLength: 100
  },
  lastname: {
    type: String,
    maxLength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
