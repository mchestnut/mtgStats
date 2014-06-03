'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'mainCtrl'});
  $routeProvider.when('/help', {templateUrl: 'partials/help.html', controller: 'helpCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
