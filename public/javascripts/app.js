var trex = angular.module('trex', ['ngRoute']);
trex.config(function($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateUrl: 'partials/login.html'
		})
		.when('/users/:id',
		{
			templateUrl: 'partials/user-dashboard.html'
		})
		.when('/routines',
		{
			templateUrl: 'partials/routine-dashboard.html'
		})
		.when('/routines/new',
		{
			templateUrl: 'partials/routine-new.html'
		})
		.otherwise(
		{
			redirectTo: '/'
		});
});