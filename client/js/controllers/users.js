
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

	$scope.checkEmail = function(callback)
	{
		usersFactory.emailExists($scope.newUser, function(exists)
		{
			console.log("Exists:", exists);
			if (exists === false)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	}

	$scope.resetEmail = function()
	{
		$scope.registration_form.email.$error.email_used = false;
	}

	$scope.registerForm = function()
	{
		$scope.checkEmail(function(taken)
		{
			if (taken)
			{
				$scope.registration_form.email.$error.email_used = true;
			}
			else
			{
				$scope.registration_form.email.$error.email_used = false;
			}

			if ($scope.registration_form.$valid && $scope.registration_form.email.$error.email_used != true) {
				// Submit as normal
				console.log("Form has no errors");
				$scope.addUser();
			}
			else {
				console.log("form errors");
				$scope.registerForm.submitted = true;
			}
		});
		
	}


	$scope.addUser = function()
	{
		console.log("In add user");
		//add user to the database
		usersFactory.addUser($scope.newUser, function()
		{
			//update list of users
			$scope.getUsers();
		});
		$location.path('/');
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