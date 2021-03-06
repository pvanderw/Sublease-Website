
var users = require("../server/controllers/users.js");
var subleases = require("../server/controllers/subleases.js");

var bodyParser = require("body-parser");

module.exports = function(app)
{
	app.use(bodyParser.json());

	app.get('/users', function(req,res)
	{
		users.show(req,res);
	});

	app.post('/user', function(req,res)
	{
		users.getUserByEmail(req,res);
	});

	app.get('/users/:id', function(req,res)
	{
		users.showById(req,res);
	});

	app.post('/add_user', function(req,res)
	{
		users.addUser(req,res);
	});

	app.post('/check_user', function(req,res)
	{
		users.usernameExists(req,res);
	});

	app.post('/check_email', function(req,res)
	{
		users.emailExists(req,res);
	});

	app.post('/validate', function(req,res)
	{
		users.validateUser(req,res);
	});

	app.post('/add_user_sublease', function(req,res)
	{
		users.addSublease(req,res);
	});

	app.get('/subleases', function(req,res)
	{
		subleases.show(req,res);
	});

	app.post('/add_sublease', function(req,res)
	{
		subleases.addSublease(req,res);
	});
};