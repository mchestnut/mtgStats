'use strict';


// Declare app level module which depends on filters, and services
angular.module('mtgStats', [
  'ngRoute',
  'ngSanitize',
  'mtgStats.filters',
  'mtgStats.services',
  'mtgStats.directives',
  'mtgStats.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'mainCtrl'});
  $routeProvider.when('/help', {templateUrl: 'partials/help.html', controller: 'helpCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
