// Load User Model
const User = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return err;
    if (!user) res.json({ error: true });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
