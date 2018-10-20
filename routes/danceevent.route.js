const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const dance_event_controller = require('../controllers/danceevent.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', dance_event_controller.test);
module.exports = router;