myApp.factory('usersFactory', function($http)
{
	users = [];
	factory = {};

	factory.getUsers = function(callback)
	{
		$http.get('/users').success(function(output)
		{
			users = output;
			callback(users);
		});
	}

	factory.getUserById = function(userId, callback)
	{
		$http.get('/users/' + userId).
			success(function(output)
			{
				callback(output);
			}).
			error(function()
			{
				console.log("Error while retrieving user by Id");
			});
	}

	factory.getUserByEmail = function(info, callback)
	{
			$http.post('/user', info).
			success(function(output)
			{
				callback(output);
			}).
			error(function()
			{
				console.log("Error while retrieving user info");
			});
	}

	factory.addUser = function(info, callback)
	{
		console.log("In factory add user");
		$http.post('/add_user', info).
			success(function(output)
			{
				console.log("Successfully added new user");
				//run callback to update list of users
				callback(output);
			}).
			error(function()
			{
				console.log("Error while adding a new user");
			});
	}

	factory.usernameExists = function(info, callback)
	{
		$http.post('/check_user', info).
			success(function(output)
			{
				console.log("checked user successfully");
				callback(output);
			}).
			error(function()
			{
				console.log("Error occured while checking user");
			});
	}

	factory.emailExists = function(info, callback)
	{
		$http.post('/check_email', info).
			success(function(output)
			{
				console.log("checked email successfully");
				callback(output);
			}).
			error(function()
			{
				console.log("Error occurred while checking email");
			});
	}

	factory.validateUser = function(info, callback)
	{
		$http.post('/validate', info).
			success(function(output)
			{
				console.log("Checked user login info successfully");
				callback(output);
			}).
			error(function()
			{
				console.log("Error occurred while checking login info");
			});
	}

	return factory;
});