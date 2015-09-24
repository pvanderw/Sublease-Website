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

	factory.addSublease = function(info, callback)
	{
		$http.post('/add_sublease', info).
			success(function(id)
			{
				// console.log("Added sublease successfully");
				callback(id);
			}).
			error(function()
			{
				console.log("Error while adding sublease");
			});
	}

	return factory;
});