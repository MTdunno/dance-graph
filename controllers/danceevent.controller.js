const DanceEvent = require('../models/danceevent.model');

//Simple version, without validation or sanitation
exports.danceevent_create = function (req, res) {
    let danceevent = new DanceEvent(
		{
			name: "Test Event 1",
			description: "This event is a test"
		}
	);
	danceevent.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

//Simple version, without validation or sanitation
exports.danceevent_list = function (req, res) {
    res.send(DanceEvent.find());
};

