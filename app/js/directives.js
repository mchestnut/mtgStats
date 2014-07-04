'use strict';

/* Directives */

angular.module('mtgStats.directives', [])

	/*###########################################
	* directive for svg graph
	###########################################*/

	.directive('graph', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/svg.html'
		}
	});
