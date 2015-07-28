
var users = require("../server/controllers/users.js");

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
		users.getUser(req,res);
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
};