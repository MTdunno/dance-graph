const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const danceevent_controller = require('../controllers/danceevent.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/createTest', danceevent_controller.danceevent_create_test_data);
router.get('/list', danceevent_controller.danceevent_list);
router.post('/create', danceevent_controller.danceevent_create);
module.exports = router;