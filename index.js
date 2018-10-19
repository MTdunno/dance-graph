const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/*', (req,res) => {
	res.send('Hello World!');
})

app.get('/api/event/:eventid', (req,res) => {
	res.send("event with id: "+req.params.eventid);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen( port, () => {
	console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env) 
})
