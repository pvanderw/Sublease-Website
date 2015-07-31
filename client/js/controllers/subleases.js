
myApp.controller('subleasesController', function($scope, $location, subleasesFactory, sessionFactory)
{
	$scope.subleases = [];
	$scope.filter = {};
	$scope.currentUser = {};
	$scope.alreadyCreatedMap = false;
	$scope.markers = [];
	$scope.markersDeleted = false;

	console.log("SUBLEASE CONTROLLER");

	//retrieves list of sublease data
	$scope.getSubleases = function()
	{
		subleasesFactory.getSubleases(function(data)
		{
			$scope.subleases = data;
			// console.log("Subleases: ", $scope.subleases);
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

	$scope.createMap = function()
	{
		subleasesFactory.getSubleases(function(data)
		{
			$scope.subleases = data;
			// console.log("Subleases: ", $scope.subleases);
			console.log("In createMap function");
			if ($scope.alreadyCreatedMap == false)
			{
				var myLatlng = new google.maps.LatLng(34.0205, -118.2856);
				var mapOptions = {
					zoom: 14,
					center: myLatlng
				};
				$scope.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

				$scope.geocoder = new google.maps.Geocoder();
			}

			console.log("Subleases length: ", $scope.subleases.length);
			for (var i=0; i < $scope.subleases.length; i++)
			{
				var address = $scope.subleases[i].address;
				$scope.geocoder.geocode( { 'address': address}, function(results, status)
				{
					if (status == google.maps.GeocoderStatus.OK)
					{
						//map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: $scope.map,
							position: results[0].geometry.location
						});
						$scope.markers.push(marker);
					} 
					else {
						//alert('Geocode was not successful for the following reason: ' + status);
						console.log("Geocode was not successful for the following reason: " + status);
					}
				});
			}

			if ($scope.alreadyCreatedMap == false)
			{
				// Create the search box and link it to the UI element.
				var input = /** @type {HTMLInputElement} */(
				document.getElementById('pac-input'));
				$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				var searchBox = new google.maps.places.SearchBox(
				/** @type {HTMLInputElement} */(input));

				// [START region_getplaces]
				// Listen for the event fired when the user selects an item from the
				// pick list. Retrieve the matching places for that item.
				google.maps.event.addListener(searchBox, 'places_changed', function() {
					var places = searchBox.getPlaces();

					if (places.length == 0) {
						return;
					}
					for (var i = 0, marker; marker = markers[i]; i++) {
						marker.setMap(null);
					}

					// For each place, get the icon, place name, and location.
					//markers = [];
					var bounds = new google.maps.LatLngBounds();
					for (var i = 0, place; place = places[i]; i++) {
						var image = {
							url: place.icon,
							size: new google.maps.Size(71, 71),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(17, 34),
							scaledSize: new google.maps.Size(25, 25)
						};

						// Create a marker for each place.
						var marker = new google.maps.Marker({
							map: $scope.map,
							icon: image,
							title: place.name,
							position: place.geometry.location
						});

						$scope.markers.push(marker);
						bounds.extend(place.geometry.location);
					}
					$scope.map.fitBounds(bounds);
				});
				// [END region_getplaces]

				// Bias the SearchBox results towards places that are within the bounds of the
				// current map's viewport.
				google.maps.event.addListener($scope.map, 'bounds_changed', function() {
					var bounds = $scope.map.getBounds();
					searchBox.setBounds(bounds);
				});
			}

			// console.log("End of map function");
			$scope.alreadyCreatedMap = true;
		});
	}

	// Sets the map on all markers in the array.
	$scope.setAllMap = function(map) {
		for (var i = 0; i < $scope.markers.length; i++) {
			$scope.markers[i].setMap(map);
		}
	}

	// Removes the markers from the map, but keeps them in the array.
	$scope.clearMarkers = function() {
		$scope.setAllMap(null);
	}

	// Shows any markers currently in the array.
	$scope.showMarkers = function() {
		$scope.setAllMap(map);
	}

	// Deletes all markers in the array by removing references to them.
	$scope.deleteMarkers = function() {
		console.log("In delete markers");
		$scope.markersDeleted = true;
		$scope.clearMarkers();
		$scope.markers = [];
	}

	$scope.updateMarkers = function(subleases)
	{
		if ($scope.alreadyCreatedMap && $scope.markersDeleted == true)
		{
			for (var i=0; i<subleases.length; i++)
			{
				console.log("Updating Markers");
				var address = subleases[i].address;
				$scope.geocoder.geocode( { 'address': address}, function(results, status)
				{
					if (status == google.maps.GeocoderStatus.OK)
					{
						//map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: $scope.map,
							position: results[0].geometry.location
						});
						$scope.markers.push(marker);
					} 
					else {
						//alert('Geocode was not successful for the following reason: ' + status);
						console.log("Geocode was not successful for the following reason: " + status);
					}
				});
			}
			$scope.markersDeleted = false;
		}
	}
});