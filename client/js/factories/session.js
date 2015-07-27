
myApp.factory('sessionFactory', function($http, $window)
{
	currentUser = {};
	factory = {};

	factory.getCurrentUser = function(callback)
	{
		callback(currentUser);
	}

	factory.setCurrentUser = function(info)
	{
		currentUser = info;
	}

	factory.logout = function()
	{
		console.log("Logged Off");
		currentUser = {};
		$window.location.href = '/';
	}

	return factory;
});