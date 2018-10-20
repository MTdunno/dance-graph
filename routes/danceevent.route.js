const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const dance_event_controller = require('../controllers/danceevent.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/create', dance_event_controller.danceevent_create);
router.get('/list', dance_event_controller.danceevent_list);
module.exports = router;