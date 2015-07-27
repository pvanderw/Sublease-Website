
myApp.controller('usersController', function($scope, $location, $routeParams, usersFactory, sessionFactory)
{
	$scope.newUser = {};
	$scope.userInfo = {};

	$scope.getUsers = function()
	{
		usersFactory.getUsers(function(data)
		{
			$scope.users = data;
		});
	}

	$scope.getUsers();

	$scope.checkPassword = function()
	{
		$scope.registration_form.confirm_password.$error.not_matching = $scope.newUser.password !== $scope.newUser.confirm_password;
	}

	$scope.registerForm = function()
	{
		if ($scope.registerForm.$valid) {
			// Submit as normal
			$scope.addUser();
		}
		else {
			$scope.registerForm.submitted = true;
		}
	}


	$scope.addUser = function()
	{
		//add user to the database
		usersFactory.addUser($scope.newUser, function()
		{
			//update list of users
			$scope.getUsers();
		});
	}

	// $scope.loginUser = function()
	// {
	// 	usersFactory.getUser($scope.newUser, function(user)
	// 	{
	// 		if (user == false)
	// 		{
	// 			$('.error').html("Username or password is incorrect");
	// 		}
	// 		else
	// 		{
	// 			sessionFactory.setCurrentUser(user);
	// 			$location.path("/home");
	// 		}
	// 	});
	// }

});