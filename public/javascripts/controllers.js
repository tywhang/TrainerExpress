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

trex.controller('NewRoutineController', function($scope, $http, SessionFactory) {
	$scope.new_routine = {}
	$scope.new_routine.steps = []
	SessionFactory.getSessionID(function(data) {
		$scope.sessionID = data
	})
	$scope.addRoutine = function() {
		$http.post('/routines/create', {
			title: $scope.new_routine.title,
			duration: $scope.new_routine.duration,
			intensity: $scope.new_routine.intensity,
			description: $scope.new_routine.description,
			steps: $scope.new_routine.steps,
			cycles: $scope.new_routine.cycles,
			user_id: $scope.sessionID
		}).success(function(data) {
			console.log(data.errors)
			$scope.routine_errors = data.errors
		})
	}

	$scope.num_steps = 1

	$scope.addStep = function() {
		$scope.num_steps += 1
	}

	$scope.removeStep = function() {
		$scope.num_steps -= 1
	}
})