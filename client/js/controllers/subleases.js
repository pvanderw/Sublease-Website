
myApp.controller('subleasesController', function($scope, $location, subleasesFactory, sessionFactory)
{
	$scope.subleases = [];
	$scope.filter = {};
	$scope.currentUser = {};

	//retrieves list of sublease data
	$scope.getSubleases = function()
	{
		subleasesFactory.getSubleases(function(data)
		{
			$scope.subleases = data;
			// console.log("Subleases: ", data);
		});
	}

	//get current logged in user
	sessionFactory.getCurrentUser(function(user)
	{
		// console.log("Current User: ", user);
		$scope.currentUser = user;
	});

	$scope.getSubleases();

	//validate sublease form, then add sublease to database
	$scope.subleaseForm = function()
	{
		if ($scope.sublease_form.$valid)
		{
			subleasesFactory.addSublease({sublease_info: $scope.newSublease, author_info: $scope.currentUser}, function()
			{
				$scope.getSubleases();
			});
			$location.path('/');
		}
	}

	$scope.filterSubleases = function(sublease)
	{
		return ((sublease.price <= $scope.filter.max_price || ($scope.filter.max_price == null || $scope.filter.max_price == "")) && (sublease.num_rooms == $scope.filter.num_rooms || ($scope.filter.num_rooms == null || $scope.filter.num_rooms == "")) && (sublease.num_bathrooms == $scope.filter.num_bathrooms || ($scope.filter.num_bathrooms == null || $scope.filter.num_bathrooms == "")));
	}	





});