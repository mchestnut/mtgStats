'use strict'

angular.module('myApp.services')

	.service('query', function(sets) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;			


		/*=================================
		* public properties
		=================================*/
		this.strings = {
			'colors': [{}],
			'rarities': [{}],
			'types': [{}],
			'cmcs': [{}],
			'ratings': [{}],
			'abilities': [{}],
		};


		/*=================================
		* public methods
		=================================*/
		
		this.sets = function(scope) {
			var ready = true;
			
			/************************
			* for each of the 3 selected sets
			************************/			
			for (var i = 0; i < 3; i++) {

				/*
				* if the set has a Taffy DB assigned
				* (important for first time load)
				*/				
				if (sets.selected[i].data) {

					// create a result collection from all records of set
					sets.selected[i].result = sets.selected[i].data();

					// for each string in query.strings
					// (ex: colors, rarities, rating)
					for (var string in root.strings) {
						var sLength = root.strings[string].length;

						// for each filter in string,
						// filter the results collection
						// (each filter is an object in set array)
						for (var j = 0; j < sLength; j++) {
							sets.selected[i].result = sets.selected[i].result.filter(root.strings[string][j]);
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
				scope.shared.createChart();
			}
		}
		
	});