'use strict';

/* Controllers */

angular.module('mtgStats.controllers', ['ngSanitize'])


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


		/*
		* toggle between single set and 3
		*/
		
		$scope.toggleSingle = function() {
			sets.toggleSingle();
			query.strings.abilities = checkbox.getQuery(abilities);
			query.sets();
		}


		/*=================================
		* init set data
		=================================*/

		if (sets.single) {
			sets.toggleSingle();
		}

		/*
		* get data for each set
		*/
		for (var i = 0; i < sets.selected.length; i++) {
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


	.controller('powerCtrl', function($scope, power, dropdown, query) {

		$scope.power = power;

		$scope.toggleUpper = function() {
			dropdown.toggleUpper(power);
			$scope.getQuery();
		}

		$scope.getQuery = function() {
			query.strings.power = dropdown.getQuery(power);
			query.sets();
		}

	})


	.controller('toughnessCtrl', function($scope, toughness, dropdown, query) {

		$scope.toughness = toughness;

		$scope.toggleUpper = function() {
			dropdown.toggleUpper(toughness);
			$scope.getQuery();
		}

		$scope.getQuery = function() {
			query.strings.toughness = dropdown.getQuery(toughness);
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


	.controller('textCtrl', function($scope, text, query) {
		
		$scope.text = text;

		$scope.getQuery = function() {
			query.strings.text = text.getQuery(text);
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
	* subcontroller of main,
	* handles full list of cards
	###########################################*/
	
	.controller('cardsCtrl', function($scope, cards) {
		$scope.cards = cards;
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
