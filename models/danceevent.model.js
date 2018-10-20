const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DanceEventSchema = new Schema({
    name: 			{type: String, required: true, max: 100},
    description:	{type: String, required: true},
});


// Export the model
module.exports = mongoose.model('DanceEvent', DanceEventSchema);