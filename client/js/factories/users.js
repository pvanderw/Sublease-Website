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

	factory.getUser = function(info, callback)
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
		$http.post('/add_user', info).
			success(function()
			{
				console.log("Successfully added new user");
				//run callback to update list of users
				callback();
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


	return factory;
});