'use strict';

/* Controllers */

angular.module('myApp.controllers')

	/*###########################################
	* subcontroller of main,
	* handles shared properities/methods
	* between all subcontrollers in options
	###########################################*/

	.controller('optionsCtrl', function($scope) {
		
		/*=================================
		* scope properties
		=================================*/


		/*=================================
		* scope methods
		=================================*/
		
	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in color optionsCtrl
	###########################################*/

	.controller('optionsColorsCtrl', function($scope, colors, checkbox, query) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.colors = colors;


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.getQuery = function() {
			query.strings.colors = checkbox.getQuery(colors);
			query.sets();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in rarity optionsCtrl
	###########################################*/

	.controller('optionsRaritiesCtrl', function($scope, rarities, checkbox, query) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.rarities = rarities;


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.getQuery = function() {
			query.strings.rarities = checkbox.getQuery(rarities);
			query.sets();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in type optionsCtrl
	###########################################*/

	.controller('optionsTypesCtrl', function($scope, types, checkbox, query) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.types = types;


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.getQuery = function() {
			query.strings.types = checkbox.getQuery(types);
			query.sets();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in cmc optionsCtrl
	###########################################*/

	.controller('optionsCmcsCtrl', function($scope, cmcs, dropdown, query) {

		/*=================================
		* scope properties
		=================================*/

		$scope.cmcs = cmcs;


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when select element is changed
		* toggle upper limit if needed
		* and update query
		************************/
		$scope.toggleUpper = function() {
			dropdown.toggleUpper(cmcs);
			$scope.getQuery();
		}

		$scope.getQuery = function() {
			query.strings.cmcs = dropdown.getQuery(cmcs);
			query.sets();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in rating optionsCtrl
	###########################################*/

	.controller('optionsRatingsCtrl', function($scope, ratings, dropdown, query) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.ratings = ratings;


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when select element is changed
		* toggle upper limit if needed
		* and update query
		************************/
		$scope.toggleUpper = function() {
			dropdown.toggleUpper(ratings);
			$scope.getQuery();
		}

		$scope.getQuery = function() {
			query.strings.ratings = dropdown.getQuery(ratings);
			query.sets();			
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in abilities optionsCtrl
	###########################################*/

	.controller('optionsAbilitiesCtrl', function($scope, abilities, checkbox, query) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.abilities = abilities;
		

		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.getQuery = function() {
			query.strings.abilities = checkbox.getQuery(abilities);
			query.sets();
		}

	});