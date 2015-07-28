
myApp.controller('subleasesController', function($scope, subleasesFactory)
{
	$scope.subleases = [];

	//retrieves list of sublease data
	$scope.getSubleases = function()
	{
		subleasesFactory.getSubleases(function(data)
		{
			$scope.subleases = data;
		});
	}

	$scope.getSubleases();

	//validate sublease form, then add sublease to database
	$scope.subleaseForm = function()
	{
		// if ($scope.sublease_form.$valid)
		// {
		// 	subleasesFactory.addSublease($scope.newSublease, function()
		// 	{
		// 		$scope.getSubleases();
		// 	});
		// }
	}	

	



});