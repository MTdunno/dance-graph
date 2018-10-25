const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const auth_controller = require('../controllers/auth.controller');

function authRequired (req, res, next) {
  console.log(req.user);
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('https://quiet-reaches-88393.herokuapp.com/auth/login');
  }
  next();
}


// a simple test url to check that all of our files are communicating correctly.
router.get('/google', authRequired, auth_controller.google);
module.exports = router;