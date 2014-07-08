'use strict'

angular.module('mtgStats.services')

	.service('details', function(sets, ratings, cards) {

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
				avgRating,
				avgCards = [],
				avgCardsTotal;


			var findAvg = function(metric) {
				var total = 0;				
				var cLength = sets.selected[i].metrics[metric].length;

				for (var j = 0; j < cLength; j++) {
					if (sets.selected[i].metrics[metric][j]) {
						totalCmcs += sets.selected[i].metrics[metric][j] * j;
					}
				}

				var avg = parseFloat((totalCmcs / totalCards).toPrecision(2));

				if (isNaN(avg)) {
					avg = 0;
				}

				return avg;
			}


			var findQty = function(rarity, packQty) {
				var resultQty = sets.selected[i].metrics.rarities[rarity];
				var setQty = sets.selected[i].rarities[rarity];

				if (!resultQty) {
					resultQty = 0;
				}
				return (resultQty / setQty) * packQty;
			}


			for (var i = 0; i < sets.selected.length; i++) {
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

					/*
					* calculate average in pack
					*/
					var cQty = findQty('Common', 10);
					var uQty = findQty('Uncommon', 3);
					var rQty = findQty('Rare', .875);
					var mQty = findQty('Mythic Rare', .125);
					avgCards[i] = cQty + uQty + rQty + mQty;
					avgCards[i] = +(Math.round(avgCards[i] + "e+2") + "e-2");
				}
			}

			root.data.push({'label': 'Total Cards', 'value': totalCards});
			root.data.push({'label': 'Average CMC', 'value': avgCmc});
			root.data.push({'label': 'Average Rating', 'value': avgRating});

			/*
			* find average cards
			*/
			for (i = 0; i < sets.selected.length; i++) {
				root.data.push({'label': 'Average Qty in ' + sets.selected[i].name + ' Pack', 'value': avgCards[i]});
			}

			if (sets.selected.length > 1) {
				avgCardsTotal = avgCards[0] + avgCards[1] + avgCards[2];
				avgCardsTotal = +(Math.round(avgCardsTotal + "e+2") + "e-2");			
				root.data.push({'label': 'Average Qty in Full Draft', 'value': avgCardsTotal});
			}

			/*
			* once details updated, update cards list
			*/
			cards.update();
		}
		
	});