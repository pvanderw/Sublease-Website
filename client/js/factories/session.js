
myApp.factory('sessionFactory', function($http, $window)
{
	currentUser = {};
	loggedIn = false
	factory = {};

	factory.getCurrentUser = function(callback)
	{
		callback(currentUser);
	}

	factory.setCurrentUser = function(info)
	{
		currentUser = info;
		loggedIn = true;
	}

	factory.isLoggedIn = function(callback)
	{
		callback(loggedIn);
	}

	factory.logout = function()
	{
		// console.log("Logged Off");
		currentUser = {};
		$window.location.href = '/';
	}

	return factory;
});