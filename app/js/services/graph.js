'use strict'

angular.module('myApp.services')

	.service('graph', function(sets, rarities) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;					


		/*=================================
		* public properties
		=================================*/
		this.dims = {
			'width': 200,
			'height': 100,
			'padding': 10,
			'spacing': 1,
			'totalSpacing': 1
		};
		this.bars = [];
		this.barsWidth = 0;
		this.lines = [];	
		


		/*=================================
		* public methods
		=================================*/
		
		this.update = function(metric) {

			var categories = [],
				combinedResults = [],
				quantities = {},
				maxQty = 0,
				cLength = 0;

			// reset bars array
			root.bars = [];

			if (metric === 'set') {

				/*
				* for each set
				*/				
				for (var j = 0; j < 3; j++) {
					if (sets.selected[j].result) {

						/*
						* set categories key to match
						*/						
						categories[j] = {
							'label': sets.selected[j].name,
							'name': sets.selected[j].name
						};
						cLength++;

						/*
						* store quantity for category
						*/						
						quantities[sets.selected[j].name] = sets.selected[j].result.get().length;

						if (quantities[sets.selected[j].name] > maxQty) {
							maxQty = quantities[sets.selected[j].name];
						}
					}
				}
			} else {

				/*
				* combine results of each set query
				*/
				// for (var j = 0; j < 3; j++) {
				// 	if (sets.selected[j].result) {
				// 		combinedResults = combinedResults.concat(sets.selected[j].result.get());
				// 	}
				// }

				if (metric === 'rarity') {

					for (var j = 0; j < 3; j++) {
						if (sets.selected[j].result) {
							for (var attr in sets.selected[j].metrics.rarities) {
								if (combinedResults[attr]) {
									combinedResults[attr] += sets.selected[j].metrics.rarities[attr];
								} else {
									combinedResults[attr] = sets.selected[j].metrics.rarities[attr];
								}
							}
						}
					}

					console.log(combinedResults);

					var rLengths = rarities.list.length;

					for (var k = 0; k < rarities.list.length; k++) {
						console.log(rarities.list[k].name + ': ' + combinedResults[rarities.list[k].name]);
					}

					// var rLength = combinedResults.length;
					// categories = rarities.list;
					// cLength = categories.length;

					/*
					* create temporary list to
					* store quantities of each category
					*/					
					// for (var k = 0; k < cLength; k++) {
					// 	quantities[categories[k].name] = 0;
					// }

					/*
					* for each item in combined results,
					* increment qty of matching category
					*/
					// for (var l = 0; l < rLength; l++) {
					// 	var category = combinedResults[l][metric];
					// 	quantities[category]++;

					// 	if (quantities[category] > maxQty) {
					// 		maxQty = quantities[category];
					// 	}
					// }
				}
			}


			/*
			* update bars array with new quantities
			*/
			for (var m = 0; m < cLength; m++) {
				var percentage = quantities[categories[m].name] / (maxQty + 1);
				root.bars.push({
					'label': categories[m].label,
					'height': (percentage * 100) + 1
				});
			}

			/*
			* get total spacing depending on number of bars
			* set bar width depending on number of bars
			*/
			root.dims.totalSpacing = (root.bars.length - 1) * root.dims.spacing;
			root.barsWidth = (100 - root.dims.totalSpacing) / root.bars.length;
			var xPos = 0;

			/*
			* for each bar
			* set starting x position
			*/
			for (var i = 0; i < root.bars.length; i++) {
				xPos = (root.barsWidth + root.dims.spacing) * i;
				root.bars[i].x = xPos;
			}
		}
		
	});