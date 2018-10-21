const DanceEvent = require('../models/danceevent.model');

//Simple version, without validation or sanitation
exports.danceevent_create_test_data = function (req, res) {
	DanceEvent.remove({},function(err){
		if(err) return next(err);
	});
	
	let danceevents = []
	
    let danceevent1 = new DanceEvent(
		{
			name: "Blue Dome Jivin",
			description: "Tulsa and one or two people from out of town."
		}
	);
	danceevent1.save(function(err){
		if(err) return next(err);
	});
	
	let danceevent2 = new DanceEvent(
		{
			name: "Nevermore",
			description: "Dancing in the street! (and maybe shagging)"
		}
	);
	danceevent2.save(function(err){
		if(err) return next(err);
	});
	
	let danceevent3 = new DanceEvent(
		{
			name: "Lindy Focus",
			description: "College Party meets dance week all Carolina-like"
		}
	);
	danceevent3.save(function(err){
		if(err) return next(err);
	});
	
	
	res.send("Test Data Loaded");
	
	
};

//Simple version, without validation or sanitation
exports.danceevent_create = function (req, res) {
    let danceevent = new DanceEvent(req.body);
	danceevent.save(function(err){
		if(err) return next(err);
	});
	res.send({"success":true});
	
};

//Simple version, without validation or sanitation
exports.danceevent_list = function (req, res) {
    DanceEvent.find().lean().exec(function (err, danceevents) {
		res.send(JSON.stringify(danceevents));
	});
};

