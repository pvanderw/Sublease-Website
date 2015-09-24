var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");

module.exports = (function()
{
	return {

		show: function(req, res)
		{
			User.find({}).populate('_subleases').exec(function(err, results)
			{
				if (err)
				{
					console.log("Error occurred while retrieving users");
				}
				else
				{
					console.log(results);
					res.json(results);
				}
			});
		},

		showById: function(req, res)
		{
			User.findOne({_id: req.params.id}).populate('_subleases').exec(function(err, result)
			{
				if (err)
				{
					console.log("Error occurred while trying to get user by Id");
				}
				else
				{
					console.log("Successfully retrieved user by Id");
					res.json(result);
				}
			});
		},

		getUserByEmail: function(req,res)
		{
			User.findOne({email: req.body.email}, function(err, results)
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
			bcrypt.hash(req.body.password, null, null, function(err, hash)
			{
				new_user = new User({name: req.body.name, email: req.body.email, phone: req.body.phone, password: hash});
				new_user.save(function(err)
				{
					if (err)
					{
						console.log("Error occured while trying to add the user to the database");
						res.json(false);
					}
					else
					{
						console.log("User was successfully added to the database");
						res.json(new_user);
					}
				});
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
		},

		emailExists: function(req,res)
		{
			User.findOne({email: req.body.email}, function(err, results)
			{
				if (err)
				{
					console.log("Error while checking if email exists");
				}
				else if (results == null)
				{
					console.log("Email does not exist");
					res.json(false);
				}
				else
				{
					console.log("Email exists");
					res.json(true);
				}
			});
		},

		validateUser: function(req,res)
		{ 	
			User.findOne({email: req.body.email}, function(err, results)
			{
				if (err)
				{
					console.log("Error checking login info in database");
				}
				else if (results == null)
				{
					console.log("User does not exist");
					res.json(false);
				}
				else
				{
					console.log("User exists");
					bcrypt.compare(req.body.password, results.password, function(err, match)
					{
						if (err)
						{
							console.log("Error checking password using bcrypt");
						}
						else if (match)
						{
							console.log("password matches");
							res.json(true);
						}
						else
						{
							console.log("password does not match");
							res.json(false);
						}
					});
				}
			});
		},

		addSublease: function(req,res)
		{
			User.findOne({_id: req.body.user_id}, function(err, currentUser)
			{
				if (err)
				{
					console.log("Error while adding to user's sublease list");
				}
				else
				{
					currentUser._subleases.push(req.body.sublease_info._id);
				}
			});
		}
	}
})();