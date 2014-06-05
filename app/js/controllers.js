'use strict';

/* Controllers */

angular.module('myApp.controllers', [])


	/*###########################################
	* controller for main view, parent
	###########################################*/

	.controller('mainCtrl', function($scope, sets) {
		
		/*=================================
		* scope properties
		=================================*/

		/************************
		* object for sharing properties
		* between subcontrollers in main
		************************/		
		$scope.shared = {
		};

	})


	/*###########################################
	* subcontroller of main,
	* handles selection of sets
	###########################################*/

	.controller('menuCtrl', function($scope, $http, sets, abilities, checkbox, query) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.sets = sets;


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* if set is changed, get data for set
		* pull abilities list from set json,
		* set data to local db with taffy
		* run query with new set data 
		************************/
		
		$scope.getData = function(selected) {
			sets.getData(selected);
			query.strings.abilities = checkbox.getQuery(abilities);
			query.sets();
		}


		/*=================================
		* init set data
		=================================*/
		for (var i = 0; i < 3; i++) {
			if (sets.selected[i].data === null) {
				sets.getData(sets.selected[i]);
				query.strings.abilities = checkbox.getQuery(abilities);
				query.sets();
			}
		};
	})


	/*###########################################
	* subcontroller of main,
	* handles dynamic graph
	###########################################*/
	
	.controller('graphCtrl', function($scope, graph) {
		$scope.graph = graph;

		$scope.updateGraph = function() {
			graph.update();
		}
	})


	/*###########################################
	* subcontroller of main,
	* handles statistics of record
	###########################################*/
	
	.controller('statsCtrl', function($scope) {
		
	})


	/*###########################################
	* controller for help view
	###########################################*/
	
	.controller('helpCtrl', function($scope) {

	})


	/*###########################################
	* controller of about view
	###########################################*/
	
	.controller('aboutCtrl', function($scope) {

	});
