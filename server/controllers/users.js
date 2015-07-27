var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = (function()
{
	return {

		show: function(req, res)
		{
			User.find({}, function(err, results)
			{
				if (err)
				{
					console.log("Error occurred while retrieving users");
				}
				else
				{
					res.json(results);
				}
			});
		},

		getUser: function(req,res)
		{
			User.findOne({name: req.body.name}, function(err, results)
			{
				if (err)
				{
					console.log("Error occurred while trying to get user from database");
				}
				else if (results == null)
				{
					console.log("Username or password is incorrect");
					res.json(false);
				}
				else
				{
					console.log("Username and password match");
					res.json(results);
				}
			});
		},

		addUser: function(req, res)
		{

			new_user = new User({name: req.body.name, email: req.body.email, phone: req.body.phone, password: req.body.password});
			new_user.save(function(err)
			{
				if (err)
				{
					console.log("Error occured while trying to add the user to the database");
				}
				else
				{
					console.log("User was successfully added to the database");
				}
			});
		},

		usernameExists: function(req, res)
		{
			User.findOne({name: req.body.name}, function(err, results)
			{
				if (err)
				{
					console.log("Error while checking if username exists");
				}
				else if (results == null)
				{
					console.log("Username does not exist");
					res.json(false);
				}
				else
				{
					console.log("Username exists");
					res.json(true);
				}
			});
		}
	}
})();