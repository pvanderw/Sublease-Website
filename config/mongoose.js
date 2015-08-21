// This is a config file that connects to MongoDB and loads all of the models
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
// require file-system so that we can load, read, require all of the model files
var fs = require('fs');
// connect to the database
var config = require('./config')[env];


var uriUtil = require('mongodb-uri');
 
/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
 
/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */
var mongodbUri = 'mongodb://heroku_j9hdq1z0:clugksl04m74ka0b8m57dvbo7i@ds035603.mongolab.com:35603/heroku_j9hdq1z0';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
















// var connect = function()
// {
// 	var options = { server: { socketOptions: { keepAlive: 1 } } }
// 	mongoose.connect(config.db, options);
// };
// connect();
// // mongoose.connect('mongodb://localhost/SubleaseDB');

// mongoose.connection.on('error', function(err)
// {
// 	console.log(err);
// });

// mongoose.connection.on('disconnected', function()
// {
// 	console.log('here on Reconnect');
// 	connect();
// });

// specify the path to all of the models
var models_path = __dirname + '/../server/models'
// read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file)
{
	if(file.indexOf('.js') > 0)
	{
		require(models_path + '/' + file);
	}
});