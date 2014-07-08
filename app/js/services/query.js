'use strict'

angular.module('mtgStats.services')

	.service('query', function(sets, metrics) {

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
			'power': [{}],
			'toughness': [{}],
			'ratings': [{}],
			'text': [{}],
			'abilities': [{}],
		};


		/*=================================
		* public methods
		=================================*/
		
		this.sets = function() {

			var ready = true;
			
			/************************
			* for each of the selected sets
			************************/			
			for (var i = 0; i < sets.selected.length; i++) {

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
			* store metrics
			*/
			if (ready) {
				// console.log(sets.selected[0].result.get());
				metrics.store();
			}
		}
		
	});