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

	return factory;
});

trex.controller('HeaderController', function($scope, SessionFactory){
	
	SessionFactory.getSessionID(function(data){
		$scope.sessionID = data;
	});
	
});