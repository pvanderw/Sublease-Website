myApp.factory('subleasesFactory', function($http)
{
	subleases = [];
	factory = {};

	factory.getSubleases = function(callback)
	{
		$http.get('/subleases').success(function(output)
		{
			subleases = output;
			callback(subleases);
		});
	}

	return factory;
});