trex.factory('SessionFactory', function($http) {
	factory = {};
	factory.setSessionID = function(id) {
		$http.post('/session/create', {
			sessionID: id
		})
	}

	factory.getSessionID = function(callback) {
		$http.get('/session').success(function(data) {
			callback(data.sessionID);
		})
	}

	factory.destroySessionID = function() {
		$http.get('/session/destroy')
	}

	return factory
});

trex.factory('UserFactory', function($http, SessionFactory) {
	factory = {}

	factory.addUser = function(data, callback) {
		$http.post('/users/create', {
			username: data.username,
			email: data.email,
			password: data.password,
			password_confirmation: data.password_confirmation
		}).success(function(data){
			callback(data)
		})
	}

	factory.loginUser = function(data, callback) {
		$http.post('/users/login', {
			username: data.username,
			password: data.password
		}).success(function(data) {
			callback(data)
		})
	}

	factory.getUsernameById = function(data, callback) {
		$http.get('/users/' + data).success(function(user) {
			callback(user)
		})
	}

	return factory
})

trex.factory('RoutineFactory', function($http, $location) {
	factory = {}

	factory.getAllRoutines = function(callback) {
		$http.get('/routines').success(function(allRoutines) {
			callback(allRoutines)
		})
	}

	factory.getUserRoutines = function(data, callback) {
		$http.post('/routines',
			{
				user_id: data.toString()
			}).success(function(user_routines) {
			callback(user_routines)
		})
	}

	factory.getRoutineById = function(id, callback) {
		$http.post('/routine',
		{
			_id: id
		}).success(function(routine) {
			callback(routine)
		})
	}

	factory.updateRoutine = function(data) {
		$http.post('/routine/change', 
		{
			_id: data._id,
			title: data.title,
			duration: data.duration,
			intensity: data.intensity,
			description: data.description,
			steps: data.steps,
			cycles: data.cycles
		}).success(function(data) {
			if (data.status == 'success') {
				$location.path('/routines')
			}
		})
	}

	factory.destroyRoutine = function(data) {
		$http.post('/routine/destroy', 
		{
			_id: data._id
		})
	}

	return factory
})