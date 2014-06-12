'use strict';

/* Controllers */

angular.module('myApp.controllers', [])


	/*###########################################
	* controller for main view, parent
	###########################################*/

	.controller('mainCtrl', function($scope) {
		
	})


	/*###########################################
	* subcontroller of main,
	* handles selection of sets
	###########################################*/

	.controller('menuCtrl', function($scope, $http, sets, abilities, checkbox, query) {
	
		$scope.sets = sets;
	
		/*=================================
		* if set is changed, get data for set
		* pull abilities list from set json,
		* run query with new set data 
		=================================*/
		
		$scope.getData = function(selected) {
			sets.getData(selected);
			query.strings.abilities = checkbox.getQuery(abilities);
			query.sets();
		}


		/*=================================
		* init set data
		=================================*/

		/*
		* get data for each set
		*/
		for (var i = 0; i < 3; i++) {
			if (sets.selected[i].data === null) {
				sets.getData(sets.selected[i]);
			}
		};

		/*
		* listen for event to fire
		* when data has successfully loaded
		*/
		$scope.$on('sets::getDataSuccess', function(event) {
			query.strings.abilities = checkbox.getQuery(abilities);
			query.sets();
		});
	})



	/*###########################################
	* subcontrollers of main,
	* handle all options
	###########################################*/

	.controller('colorsCtrl', function($scope, colors, checkbox, query) {
		
		$scope.colors = colors;

		$scope.getQuery = function() {
			query.strings.colors = checkbox.getQuery(colors);
			query.sets();
		}

	})


	.controller('raritiesCtrl', function($scope, rarities, checkbox, query) {
		
		$scope.rarities = rarities;

		$scope.getQuery = function() {
			query.strings.rarities = checkbox.getQuery(rarities);
			query.sets();
		}

	})


	.controller('typesCtrl', function($scope, types, checkbox, query) {
		
		$scope.types = types;

		$scope.getQuery = function() {
			query.strings.types = checkbox.getQuery(types);
			query.sets();
		}

	})


	.controller('cmcsCtrl', function($scope, cmcs, dropdown, query) {

		$scope.cmcs = cmcs;

		$scope.toggleUpper = function() {
			dropdown.toggleUpper(cmcs);
			$scope.getQuery();
		}

		$scope.getQuery = function() {
			query.strings.cmcs = dropdown.getQuery(cmcs);
			query.sets();
		}

	})


	.controller('ratingsCtrl', function($scope, ratings, dropdown, query) {
		
		$scope.ratings = ratings;

		$scope.toggleUpper = function() {
			dropdown.toggleUpper(ratings);
			$scope.getQuery();
		}

		$scope.getQuery = function() {
			query.strings.ratings = dropdown.getQuery(ratings);
			query.sets();			
		}

	})


	.controller('abilitiesCtrl', function($scope, abilities, checkbox, query) {
		
		$scope.abilities = abilities;

		$scope.getQuery = function() {
			query.strings.abilities = checkbox.getQuery(abilities);
			abilities.cleanSelected();
			query.sets();
		}

	})



	/*###########################################
	* subcontroller of main,
	* handles dynamic graph
	###########################################*/
	
	.controller('graphCtrl', function($scope, graph, metrics) {
		$scope.graph = graph;
		$scope.metrics = metrics;

		$scope.updateGraph = function() {
			graph.update($scope.metrics.selected);
		}
	})



	/*###########################################
	* subcontroller of main,
	* handles statistics of record
	###########################################*/
	
	.controller('detailsCtrl', function($scope, details) {
		$scope.details = details;
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
