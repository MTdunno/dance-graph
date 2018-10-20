const DanceEvent = require('../models/danceevent.model');

//Simple version, without validation or sanitation
exports.danceevent_create_test_data = function (req, res) {
	DanceEvent.deleteMany();
	
	let danceevents = []
	
    let danceevent1 = new DanceEvent(
		{
			name: "Blue Dome Jivin",
			description: "Tulsa and one or two people from out of town."
		}
	);
	danceevents.push(danceevent1);
	
	let danceevent2 = new DanceEvent(
		{
			name: "Nevermore",
			description: "Dancing in the street! (and maybe shagging)"
		}
	);
	danceevents.push(danceevent2);
	
	let danceevent3 = new DanceEvent(
		{
			name: "Lindy Focus",
			description: "College Party meets dance week all Carolina-like"
		}
	);
	danceevents.push(danceevent3);
	
	DanceEvent.insert(danceevents, function(err){
		if(err) return next(err);
		res.send("Test Data Loaded");
	});
	
	
};

//Simple version, without validation or sanitation
exports.danceevent_list = function (req, res) {
    DanceEvent.find().lean().exec(function (err, danceevents) {
		res.send(JSON.stringify(danceevents));
	});
};

