const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const auth_controller = require('../controllers/auth.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/google', auth_controller.google);
module.exports = router;