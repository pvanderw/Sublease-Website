
myApp.controller('usersController', function($scope, $location, $routeParams, usersFactory, sessionFactory)
{
	$scope.newUser = {};
	$scope.userInfo = {};
	$scope.user = {};

	//retrieves list of users from users factory
	$scope.getUsers = function()
	{
		usersFactory.getUsers(function(data)
		{
			$scope.users = data;
		});
	}

	$scope.getUsers();

	//checks if password and confirm password are equal
	$scope.checkPassword = function()
	{
		$scope.registration_form.confirm_password.$error.not_matching = $scope.newUser.password !== $scope.newUser.confirm_password;
	}

	//checks if the email has already been used to create an account
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

	//validate register form
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

	//add user info to database, return to home page
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

	$scope.validateUserLoginInfo = function(callback)
	{
		usersFactory.validateUser($scope.user, function(valid)
		{
			callback(valid);
		});
	}

	$scope.loginUser = function(form)
	{
		$scope.validateUserLoginInfo(function(isValid)
		{
			if (isValid)
			{
				form.validUser = true;
				sessionFactory.setCurrentUser({email: $scope.user.email});
				$scope.loggedIn = true;
				$location.path('/');

			}
			else
			{
				form.validUser = false;
			}
		});
	}

	$scope.isLoggedIn = function()
	{
		sessionFactory.isLoggedIn(function(loggedIn)
		{
			console.log("Logged In: ", loggedIn);
			$scope.loggedIn = loggedIn
		});
	}

	$scope.logout = function()
	{
		sessionFactory.logout();
	}

});