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

	.controller('optionsColorsCtrl', function($scope, formsSvc) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.optionsList = [
			{'label': 'White', 'name': 'W'},
			{'label': 'Blue', 'name': 'U'},
			{'label': 'Black', 'name': 'B'},
			{'label': 'Red', 'name': 'R'},
			{'label': 'Green', 'name': 'G'},
			{'label': 'Colorless', 'name': 'C'}
		];
		$scope.optionsModel = [];
		$scope.column = 'cost';
		$scope.fuzzy = true;
		$scope.includes = 'any';


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.checkboxQuery = function() {
			$scope.shared.mainQuery.colors = formsSvc.checkboxQuery($scope);
			$scope.shared.queryLists();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in rarity optionsCtrl
	###########################################*/

	.controller('optionsRaritiesCtrl', function($scope, formsSvc) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.optionsList = $scope.shared.categories.rarities;
		$scope.optionsModel = [];
		$scope.column = 'rarity';
		$scope.includes = 'any';


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.checkboxQuery = function() {
			$scope.shared.mainQuery.rarities = formsSvc.checkboxQuery($scope);
			$scope.shared.queryLists();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in type optionsCtrl
	###########################################*/

	.controller('optionsTypesCtrl', function($scope, formsSvc) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.optionsList = [
			{'label': 'Creature', 'name': 'Creature'},
			{'label': 'Planeswalker', 'name': 'Planeswalker'},
			{'label': 'Enchantment', 'name': 'Enchantment'},
			{'label': 'Artifact', 'name': 'Artifact'},
			{'label': 'Instant', 'name': 'Instant'},
			{'label': 'Sorcery', 'name': 'Sorcery'},
			{'label': 'Land', 'name': 'Land'},
		];
		$scope.optionsModel = [];
		$scope.column = 'type';
		$scope.fuzzy = true;
		$scope.includes = 'any';


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.checkboxQuery = function() {
			$scope.shared.mainQuery.types = formsSvc.checkboxQuery($scope);
			$scope.shared.queryLists();
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in cmc optionsCtrl
	###########################################*/

	.controller('optionsCmcsCtrl', function($scope, formsSvc) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.comparisonsList = [
			{'label': 'Equal To', 'name': 'equal'},
			{'label': 'Greater or Equal To', 'name': 'greater'},
			{'label': 'Less or Equal To', 'name': 'lesser'},
			{'label': 'Between', 'name': 'between'}
		];
		$scope.comparisonsModel = 'equal';
		$scope.hideUpper = true;
		$scope.column = 'cmc';


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.selectToggle = function() {
			formsSvc.selectToggle($scope);
			$scope.selectQuery();
		}

		$scope.selectQuery = function() {
			$scope.shared.mainQuery.cmcs = formsSvc.selectQuery($scope);
			$scope.shared.queryLists();			
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in rating optionsCtrl
	###########################################*/

	.controller('optionsRatingsCtrl', function($scope, formsSvc) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.comparisonsList = [
			{'label': 'Equal To', 'name': 'equal'},
			{'label': 'Greater or Equal To', 'name': 'greater'},
			{'label': 'Less or Equal To', 'name': 'lesser'},
			{'label': 'Between', 'name': 'between'}
		];
		$scope.comparisonsModel = 'equal';
		$scope.hideUpper = true;
		$scope.optionsList = [
			{'label': '-', 'name': '-'},
			{'label': 'A+', 'name': 15},
			{'label': 'A', 'name': 14},
			{'label': 'A-', 'name': 13},
			{'label': 'B+', 'name': 12},
			{'label': 'B', 'name': 11},
			{'label': 'B-', 'name': 10},
			{'label': 'C+', 'name': 9},
			{'label': 'C', 'name': 8},
			{'label': 'C-', 'name': 7},
			{'label': 'D+', 'name': 6},
			{'label': 'D', 'name': 5},
			{'label': 'D-', 'name': 4},
			{'label': 'F+', 'name': 2},
		];
		$scope.lower = '-';
		$scope.upper = '-';
		$scope.column = 'rating';


		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.selectToggle = function() {
			formsSvc.selectToggle($scope);
			$scope.selectQuery();
		}

		$scope.selectQuery = function() {
			$scope.shared.mainQuery.ratings = formsSvc.selectQuery($scope);
			$scope.shared.queryLists();			
		}

	})


	/*###########################################
	* subcontroller of options,
	* handles all fields in abilities optionsCtrl
	###########################################*/

	.controller('optionsAbilitiesCtrl', function($scope, formsSvc) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.optionsList = $scope.shared.categories.abilities;
		$scope.optionsModel = [];
		$scope.column = 'abilities';
		$scope.fuzzy = true;
		$scope.includes = 'any';
		
		// reveal model to parent
		$scope.shared.abilitiesModel = $scope.optionsModel;

		/*=================================
		* scope methods
		=================================*/
		
		/************************
		* called when checkbox is changed
		* poll all checkboxes for values
		* and update query
		************************/
		$scope.checkboxQuery = function() {
			$scope.shared.mainQuery.abilities = formsSvc.checkboxQuery($scope);
			$scope.shared.queryLists();
		}


		/************************
		* called when set is changed
		* revealed to parent scope
		************************/		
		$scope.shared.abilitiesRefresh = function() {
			$scope.shared.mainQuery.abilities = formsSvc.checkboxQuery($scope);
		}

	});