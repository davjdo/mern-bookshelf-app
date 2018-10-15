const express = require('express');
const router = express.Router();

// Load User Model
const User = require('../../models/User');

// Auth middleware
const { auth } = require('../../middleware/auth');

// @route   POST api/users/auth
// @desc    Route if token is valid, checking in react is User is authenticated
// @access  Private
router.get('/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname
  });
});

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc
    });
  });
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: 'Auth failed, email not found'
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: 'Wrong password'
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        });
      });
    });
  });
});

// @route   GET api/users/logout
// @desc    Logout a user with auth middleware
// @access  Private
router.get('/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// @route   GET api/users
// @desc    Get users
// @access  Private
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

module.exports = router;
