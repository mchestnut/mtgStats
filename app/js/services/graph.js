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
		this.metrics = {
			list: [
				{'label': 'Sets', 'name': 'set'},
				// {'label': 'Colors', 'name': 'cmc'},
				{'label': 'Rarities', 'name': 'rarity'},
				// {'label': 'Type', 'name': 'type'},
				{'label': 'CMC', 'name': 'cmc'},
				{'label': 'Rating', 'name': 'rating'},
				// {'label': 'Abilities', 'name': 'abilities'}
			],
			selected: 'set'
		};
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
		
		this.update = function() {

			var categories = [],
				combinedResults = [],
				quantities = {},
				maxQty = 0,
				cLength = 0;

			// reset bars array
			root.bars = [];

			if (root.metrics.selected === 'set') {

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
				for (var j = 0; j < 3; j++) {
					if (sets.selected[j].result) {
						combinedResults = combinedResults.concat(sets.selected[j].result.get());
					}
				}

				if (root.metrics.selected === 'rarity') {

					var rLength = combinedResults.length;
					categories = rarities.list;
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
						var category = combinedResults[l][root.metrics.selected];
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