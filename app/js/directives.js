'use strict';

/* Directives */


angular.module('myApp.directives', [])

	/*###########################################
	* directive for svg chart
	###########################################*/

	.directive('chart', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/svg.html'
		}
	});
