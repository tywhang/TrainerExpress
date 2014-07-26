trex.controller('FrontPageController', function($http, $scope, $location, SessionFactory) {

	$scope.addUser = function() {
		$http.post('/users/create', {
			username: $scope.new_user.username,
			email: $scope.new_user.email,
			password: $scope.new_user.password,
			password_confirmation: $scope.new_user.password_confirmation
		}).success(function(data){
			$scope.signup_errors = data.errors;
			if (data.status == 'success') {
				SessionFactory.setSessionID(data._id);
				$location.path('/users/' + data._id)
			}
		})
	}

	$scope.loginUser = function() {
		$http.post('/users/login', {
			username: $scope.return_user.username,
			password: $scope.return_user.password
		}).success(function(data) {
			$scope.login_error = data.message
			SessionFactory.setSessionID(data._id)
			$location.path('/users/' + data._id)
		})
	}
});

trex.controller('UserController', function($http, $location, $scope, SessionFactory) {

	$scope.logoutUser = function() {
		SessionFactory.destroySessionID()
		$location.path('/')
	}

	SessionFactory.getSessionID(function(data) {
		$http.get('/users/' + data).success(function(user) {
			$scope.username = user['username']
		})	
	})
})

trex.controller('NewRoutineController', function($scope) {
	$scope.addRoutine = function() {
		alert('heyo')
	}
})