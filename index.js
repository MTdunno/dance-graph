const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req,res) => res.send('Hello World!'))

app.listen( port, () => console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env) )
