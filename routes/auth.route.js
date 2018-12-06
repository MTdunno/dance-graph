const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const auth_controller = require('../controllers/auth.controller');

//function authRequired (req, res, next) {
//  console.log(req.user);
//  if (!req.user) {
//	  console.log("RETURN URL");
//	  console.log(req.originalUrl);
//	  console.log(req);
//    req.session.oauth2return = req.originalUrl;
//    return res.redirect('/auth/login');
//  }
//  next();
//}


// a simple test url to check that all of our files are communicating correctly.
router.get('/google', auth_controller.google);
module.exports = router;