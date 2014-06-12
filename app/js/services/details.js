'use strict'

angular.module('myApp.services')

	.service('details', function(sets, ratings) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/
		this.data = [];


		/*=================================
		* public methods
		=================================*/

		this.update = function() {
			
			/*
			* reset
			*/
			root.data = [];

			var totalCards = 0,
				totalCmcs = 0,
				totalRatings = 0,
				avgCmc,
				avgRating;


			var findAvg = function(metric) {
				var total = 0;				
				var cLength = sets.selected[i].metrics[metric].length;

				for (var j = 0; j < cLength; j++) {
					if (sets.selected[i].metrics[metric][j]) {
						totalCmcs += sets.selected[i].metrics[metric][j] * j;
					}
				}

				var avg = parseFloat((totalCmcs / totalCards).toPrecision(3));

				if (isNaN(avg)) {
					avg = 0;
				}

				return avg;
			}


			for (var i = 0; i < 3; i++) {
				if (sets.selected[i].result) {
					totalCards += sets.selected[i].result.get().length;
					avgCmc = findAvg('cmcs');

					/*
					* round avgRating,
					* and convert to letter scale
					*/					
					avgRating = findAvg('ratings');
					avgRating = Math.round(avgRating);
					var rLength = ratings.list.length;
					for (var j = 0; j < rLength; j++) {
						if (ratings.list[j].name == avgRating) {
							avgRating = ratings.list[j].label;
							break;
						}
					}
				}
			}

			root.data.push({'label': 'Total Cards', 'value': totalCards});
			root.data.push({'label': 'Average CMC', 'value': avgCmc});
			root.data.push({'label': 'Average Rating', 'value': avgRating});
		}
		
	});