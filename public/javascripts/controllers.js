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

trex.controller('UserController', function($scope, $http, $location, SessionFactory, RoutineFactory) {

	$scope.logoutUser = function() {
		SessionFactory.destroySessionID()
		$location.path('/')
	}

	SessionFactory.getSessionID(function(data) {
		$scope.sessionID = data
		$http.get('/users/' + data).success(function(user) {
			$scope.username = user['username']

			RoutineFactory.getAllRoutines(function(allRoutines) {
				$scope.allRoutines = allRoutines
			})

			RoutineFactory.getUserRoutines(data, function(user_routines) {
				$scope.user_routines = user_routines
			})

		})
	})

	
})

trex.controller('RoutineController', function($scope, $http, SessionFactory, RoutineFactory) {
	SessionFactory.getSessionID(function(data) {
		$scope.sessionID = data
		RoutineFactory.getUserRoutines(data, function(user_routines) {
			$scope.user_routines = user_routines
		})
	})

	$scope.destroyRoutine = function(id, index) {
		$scope.user_routines.splice(index, 1);
		console.log('user routines', $scope.user_routines)
		if(confirm('Are you sure?')) {
			RoutineFactory.destroyRoutine(
			{
				_id: id
			})
		}
	}
})

trex.controller('NewRoutineController', function($scope, $http, $location, SessionFactory) {
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
			$scope.routine_errors = data.errors
			if (data.status === 'success') {
				$location.path('/routines')
			}
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

trex.controller('EditRoutineController', function($scope, $routeParams, RoutineFactory) {
	RoutineFactory.getRoutineById($routeParams.id, function(routine) {
		$scope.edit_routine = routine
		$scope.num_steps = routine.steps.length
	})

	$scope.addStep = function() {
		$scope.num_steps += 1
	}

	$scope.removeStep = function() {
		$scope.num_steps -= 1
	}

	$scope.changeRoutine = function() {
		RoutineFactory.updateRoutine(
			{
				_id: $scope.edit_routine._id,
				title: $scope.edit_routine.title,
				duration: $scope.edit_routine.duration,
				intensity: $scope.edit_routine.intensity,
				description: $scope.edit_routine.description,
				steps: $scope.edit_routine.steps,
				cycles: $scope.edit_routine.cycles
			}
		)
	}
})