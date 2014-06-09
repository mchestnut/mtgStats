'use strict'

angular.module('myApp.services')

	.service('graph', function(sets, colors, rarities, types, cmcs, ratings, abilities) {

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

			var results = [],
				maxQty = 0;

			// reset bars array
			root.bars = [];


			/*
			* for each set, if result set exists,
			* combine stored metrics into one array
			* get maximum quantity of metric
			*/
			var combineResults = function(metricSet) {
				var tResults = [];

				for (var j = 0; j < 3; j++) {
					if (sets.selected[j].result) {
						for (var attr in sets.selected[j].metrics[metricSet]) {
							if (tResults[attr]) {
								tResults[attr] += sets.selected[j].metrics[metricSet][attr];
							} else {
								tResults[attr] = sets.selected[j].metrics[metricSet][attr];
							}

							if (tResults[attr] > maxQty) {
								maxQty = tResults[attr];
							}
						}
					}
				}

				return tResults;
			}


			/*
			* push new bar item to bars array
			*/
			var pushBar = function(qty, label) {
				var tQty = qty;

				if (tQty === undefined) {
					tQty = 0;
				}

				var percentage = tQty / (maxQty + 1);

				root.bars.push({
					'label': label,
					'height': (percentage * 100) + 1
				})
			}


			if (metric === 'set') {

				/*
				* for each set, if result set exists
				* get maximum quantity of metric
				*/				
				for (var j = 0; j < 3; j++) {
					if (sets.selected[j].result) {
						if (sets.selected[j].result.get().length > maxQty) {
							maxQty = sets.selected[j].result.get().length;
						}
					}
				}

				/*
				* for each set, if result set exists
				* get height and create new bar
				*/	
				for (j = 0; j < 3; j++) {
					if (sets.selected[j].result) {
						pushBar(sets.selected[j].result.get().length, sets.selected[j].name)
					}
				}

			} else {
				if (metric === 'rarity') {
					var sLength = rarities.list.length;
					results = combineResults('rarities');

					for (var k = 0; k < sLength; k++) {
						pushBar(results[rarities.list[k].name], rarities.list[k].name)
					}

				} else if (metric === 'type') {
					var sLength = types.list.length;
					results = combineResults('types');

					for (var k = 0; k < sLength; k++) {
						pushBar(results[types.list[k].name], types.list[k].name)
					}
				}
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