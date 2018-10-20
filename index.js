const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const danceevent = require('./routes/danceevent.route'); 

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/event', danceevent);

app.get('/api/profile/:profileid', (req,res) => {
	res.send("profile with id: "+req.params.profileid);
})

app.get('/api/*', (req,res) => {
	res.send("This is the generic API page");
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen( port, () => {
	console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env) 
})
