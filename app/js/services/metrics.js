'use strict'

angular.module('myApp.services')

	.service('metrics', function(sets, colors, rarities, types, cmcs, ratings, abilities, graph) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;			


		/*=================================
		* public properties
		=================================*/
		this.list = [
				{'label': 'Sets', 'name': 'set'},
				// {'label': 'Colors', 'name': 'cost'},
				{'label': 'Rarities', 'name': 'rarity'},
				// {'label': 'Types', 'name': 'type'},
				{'label': 'CMCs', 'name': 'cmc'},
				{'label': 'Ratings', 'name': 'rating'},
				// {'label': 'Abilities', 'name': 'abilities'}
			];
		this.selected = 'set';


		/*=================================
		* public methods
		=================================*/
		
		this.store = function() {

			/*
			* for each set
			*/			
			for (var i = 0; i < 3; i++) {

				var result = sets.selected[i].result.get(),
					rLength = result.length;

				/*
				* reset metrics	
				*/
				sets.selected[i].metrics.sets = [];
				sets.selected[i].metrics.colors = [];
				sets.selected[i].metrics.rarities = [];
				sets.selected[i].metrics.types = [];
				sets.selected[i].metrics.cmcs = [];
				sets.selected[i].metrics.ratings = [];
				sets.selected[i].metrics.abilities = [];

				/*
				* for each card in result set
				*/
				for (var j = 0; j < rLength; j++) {
					var	tCost = '',
						tType = [],
						tAbilities = [];

					/*
					* parse cost by removing brackets,
					* if number or X, replace with C
					* if color, remove C,
					* remove duplicate characters
					*/
					tCost = result[j].cost.replace(/{|}/g, '');
					tCost = tCost.replace(/[\dX]/g, 'C');
					tCost = tCost.replace(/([C])(?=[WUBRG])/g, '');
					tCost = tCost.replace(/(.)(?=\1)/g, '');

					/*
					* if multicolor and group is toggled
					*/
					if (tCost.length > 1 && colors.group) {
						tCost = 'M';
					}


					/*
					* parse abilities by splitting at hyphen,
					* then splitting pre-hyphen at spaces
					*/
					tType = result[j].type.split(' -');
					tType = tType[0].split(' ');

					/*
					* parse type by splitting into array
					*/
					if (result[j].abilities) {
						tAbilities = result[j].abilities.split(', ');
					}				


					/*
					* store values in set metrics object
					*/
					var storeValue = function(metric, value) {
						if (sets.selected[i].metrics[metric][value]) {
							sets.selected[i].metrics[metric][value]++
						} else {
							sets.selected[i].metrics[metric][value] = 1;
						}
					}

					storeValue('colors', tCost);
					storeValue('rarities', result[j].rarity);
					storeValue('cmcs', result[j].cmc);
					storeValue('ratings', result[j].rating);

					for (var t = 0; t < tType.length; t++) {
						if (tType[t] != 'Legendary') {
							storeValue('types', tType[t]);
						}
					}

					for (var a = 0; a < tAbilities.length; a++) {
						storeValue('abilities', tAbilities[a]);
					}
				}

			}

			/*
			* once metrics stored, update graph
			*/
			graph.update(root.selected);
		}
		
	});