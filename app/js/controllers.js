'use strict';

/* Controllers */

angular.module('myApp.controllers', [])


	/*###########################################
	* controller for main view, parent
	###########################################*/

	.controller('mainCtrl', function($scope) {
		
		/*=================================
		* scope properties
		=================================*/

		/************************
		* object for sharing properties
		* between subcontrollers in main
		************************/		
		$scope.shared = {
			'selectedSets': [
				{
					'name': 'JOU',
					'data': null,
					'abilities': [],
					'result': null
				},
				{
					'name': 'BNG',
					'data': null,
					'abilities': [],
					'result': null
				},
				{
					'name': 'THS',
					'data': null,
					'abilities': [],
					'result': null
				}
			],
			'categories': {
				'abilities': [],
				'rarities': [
					{
						'label': 'Mythic',
						'name': 'Mythic Rare'
					},
					{
						'label': 'Rare',
						'name': 'Rare'
					},
					{
						'label': 'Uncommon',
						'name': 'Uncommon'
					},
					{
						'label': 'Common',
						'name': 'Common'
					},
					{
						'label': 'Basic Land',
						'name': 'Land'
					}
				]
			},
			'abilitiesRefresh': [],
			'abilitiesModel': [],
			'mainQuery': {
				'colors': [{}],
				'rarities': [{}],
				'types': [{}],
				'cmcs': [{}],
				'ratings': [{}],
				'abilities': [{}],
			}
		};


		/*=================================
		* scope methods
		=================================*/
		$scope.shared.queryLists = function() {
			var ready = true;
			
			/************************
			* for each of the 3 selected sets
			************************/			
			for (var i = 0; i < 3; i++) {

				/*
				* if the set has a Taffy DB assigned
				* (important for first time load)
				*/				
				if ($scope.shared.selectedSets[i].data) {

					// create a result collection from all records of set
					$scope.shared.selectedSets[i].result = $scope.shared.selectedSets[i].data();

					// for each query set in mainQuery
					// (ex: colors, rarities, rating)
					for (var query in $scope.shared.mainQuery) {
						var qLength = $scope.shared.mainQuery[query].length;

						// for each filter in query set,
						// filter the results collection
						// (each filter is an object in set array)
						for (var j = 0; j < qLength; j++) {
							$scope.shared.selectedSets[i].result = $scope.shared.selectedSets[i].result.filter($scope.shared.mainQuery[query][j]);
						};
					};
				} else {
					ready = false;
				}
			};

			/*
			* if all sets are ready,
			* create chart
			*/
			if (ready) {
				$scope.shared.createChart();
			}
		};

	})


	/*###########################################
	* subcontroller of main,
	* handles selection of sets
	###########################################*/

	.controller('menuCtrl', function($scope, $http) {

		/*=================================
		* scope properties
		=================================*/
		
		$scope.setsList = [
			{'name': 'THS'},
			{'name': 'BNG'},
			{'name': 'JOU'}
		];


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

			$http.get('json/' + selected.name + '.json').success(function(data) {

				// store selected abilities
				var sLength = $scope.shared.categories.abilities.length,
					sArray = [];
				for (var s = 0; s < sLength; s++) {
					if ($scope.shared.abilitiesModel[s]) {
						sArray.push($scope.shared.categories.abilities[s].name);
					}
				}
				sLength = sArray.length;

				while ($scope.shared.abilitiesModel.length > 0) {
					$scope.shared.abilitiesModel.pop();
				}

				while($scope.shared.categories.abilities.length > 0) {
					$scope.shared.categories.abilities.pop();
				}		

				selected.data = TAFFY(JSON.stringify(data));
				selected.abilities = selected.data({'abilities': {'isArray': true}}).get();
				selected.data({'abilities': {'isArray': true}}).remove(false);

				for (var i = 0; i < 3; i++) {
					if ($scope.shared.selectedSets[i].abilities.length) {									
						// get length of abilities list
						var aLength = $scope.shared.selectedSets[i].abilities[0].abilities.length;

						// for each item in list
						for (var j = 0; j < aLength; j++) {
							var ability = $scope.shared.selectedSets[i].abilities[0].abilities[j],
								gLength = $scope.shared.categories.abilities.length,
								found = false;

							// check is item already in shared list
							for (var g = 0; g < gLength; g++) {
								if ($scope.shared.categories.abilities[g].label == ability) {
									found = true;
								}
							}

							// if item is not found, push
							if (!found) {
								$scope.shared.categories.abilities.push({'label': ability, 'name': ability});
							}
						}
					}
				}

				// sort abilities alphabetically
				$scope.shared.categories.abilities.sort(function(a, b) {
					if (a.name > b.name) {
						return 1;
					} else if (a.name < b.name) {
						return -1;
					} else {
						return 0;
					}
				});


				aLength = $scope.shared.categories.abilities.length;

				// for each ability in stored abilities
				for (s = 0; s < sLength; s++) {
					// for each ability in abilities list
					for (j = 0; j < aLength; j++) {

						// if ability is stored, mark true to select
						if (sArray[s] == $scope.shared.categories.abilities[j].name) {
							$scope.shared.abilitiesModel[j] = true;
						}
					}
				}

				$scope.shared.abilitiesRefresh();
				$scope.shared.queryLists();
			});
		}


		/*=================================
		* init set data
		=================================*/
		for (var i = 0; i < 3; i++) {
			if ($scope.shared.selectedSets[i].data === null) {
				$scope.getData($scope.shared.selectedSets[i]);
			}
		};
	})


	/*###########################################
	* subcontroller of main,
	* handles dynamic chart
	###########################################*/
	
	.controller('chartCtrl', function($scope, $interval) {
		$scope.bars = [];
		$scope.lines = [];
		$scope.chart = {
			'width': 200,
			'height': 100,
			'padding': 10,
			'spacing': 1
		};
		$scope.metricsList = [
			{
				'label': 'Sets',
				'name': 'set'
			},
			// {
			// 	'label': 'Colors',
			// 	'name': 'cmc'
			// },
			{
				'label': 'Rarities',
				'name': 'rarity'
			},
			// {
			// 	'label': 'Type',
			// 	'name': 'type'
			// },
			{
				'label': 'CMC',
				'name': 'cmc'
			},
			{
				'label': 'Rating',
				'name': 'rating'
			},
			// {
			// 	'label': 'Abilities',
			// 	'name': 'abilities'
			// }
		];
		$scope.selectedMetric = 'set';

		// $scope.startTimer = function(key) {
		// 	if (!angular.isDefined($scope.bars[key].timer)) {
		// 		console.log('start timer');
		// 		$scope.bars[key].timer = $interval(function() {
		// 			$scope.changeHeight(key)
		// 			}, 20
		// 		);
		// 	}
		// }

		// $scope.stopTimer = function(key) {
		// 	if ($scope.bars[key].timer != null) {
		// 		console.log('stop timer');
		// 		$interval.cancel($scope.bars[key].timer);
		// 		$scope.bars[key].timer = undefined;
		// 	}
		// }

		// $scope.changeHeight = function(key) {
		// 	if ($scope.bars[key].height < $scope.bars[key].newHeight) {
		// 		$scope.bars[key].height = $scope.bars[key].height + 1;
		// 		console.log('new height: ' + $scope.bars[key].height);
		// 	} else {
		// 		$scope.stopTimer(key);
		// 	}
		// }

		// $scope.createChart = function(key, newHeight) {
		// 	if ($scope.bars[key].height != newHeight) {
		// 		$scope.bars[key].newHeight = newHeight;
		// 		$scope.startTimer(key);
		// 	}
		// }

		// $scope.$on('$destroy', function() {
		// 	$scope.startTimer();
		// })

		$scope.createChart = function() {

			var categories = [],
				combinedResults = [],
				quantities = {},
				maxQty = 0,
				cLength = 0;
			$scope.bars = [];
			$scope.lines = [];

			if ($scope.selectedMetric === 'set') {

				/*
				* for each set
				*/				
				for (var j = 0; j < 3; j++) {
					if ($scope.shared.selectedSets[j].result) {

						/*
						* set categories key to match
						*/						
						categories[j] = {
							'label': $scope.shared.selectedSets[j].name,
							'name': $scope.shared.selectedSets[j].name
						};
						cLength++;

						/*
						* store quantity for category
						*/						
						quantities[$scope.shared.selectedSets[j].name] = $scope.shared.selectedSets[j].result.get().length;

						if (quantities[$scope.shared.selectedSets[j].name] > maxQty) {
							maxQty = quantities[$scope.shared.selectedSets[j].name];
						}
					}
				}
			} else {

				/*
				* combine results of each set query
				*/
				for (var j = 0; j < 3; j++) {
					if ($scope.shared.selectedSets[j].result) {
						combinedResults = combinedResults.concat($scope.shared.selectedSets[j].result.get());
					}
				}

				if ($scope.selectedMetric === 'rarity') {

					var rLength = combinedResults.length;
					categories = $scope.shared.categories.rarities;
					cLength = categories.length;

					/*
					* create temporary list to
					* store quantities of each category
					*/					
					for (var k = 0; k < cLength; k++) {
						quantities[categories[k].name] = 0;
					}

					/*
					* for each item in combined results,
					* increment qty of matching category
					*/
					for (var l = 0; l < rLength; l++) {
						var category = combinedResults[l][$scope.selectedMetric];
						quantities[category]++;

						if (quantities[category] > maxQty) {
							maxQty = quantities[category];
						}
					}
				}
			}

			/*
			* update bars array with new quantities
			*/
			for (var m = 0; m < cLength; m++) {
				var percentage = quantities[categories[m].name] / (maxQty + 1);
				$scope.bars.push({
					'label': categories[m].label,
					'height': (percentage * 100) + 1
				});
			}


			/*
			* get total spacing depending on number of bars
			* set bar width depending on number of bars
			*/
			$scope.totalSpacing = ($scope.bars.length - 1) * $scope.chart.spacing;
			$scope.barsWidth = (100 - $scope.totalSpacing) / $scope.bars.length;
			var xPos = 0;

			/*
			* for each bar
			* set starting x position
			*/
			for (var i = 0; i < $scope.bars.length; i++) {
				xPos = ($scope.barsWidth + $scope.chart.spacing) * i;
				$scope.bars[i].x = xPos;
			}
		}

		$scope.shared.createChart = function() {
			$scope.createChart();
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
