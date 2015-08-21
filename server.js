var express = require('express');
var path = require('path');
// instantiate the app
var app = express();
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
var bodyParser = require("body-parser");
app.use(bodyParser.json());

require('./config/mongoose.js');
require('./config/routes.js')(app);

// app.listen(6789, function()
// {
// 	console.log('Listening on port 6789');
// });

var port = process.env.PORT || 8000;
var server = require('http').createServer(app).listen(port);

//  app.listen(app.get('port'), function(){
// 	console.log("Express server listening on port " + app.get('port'));
// });

