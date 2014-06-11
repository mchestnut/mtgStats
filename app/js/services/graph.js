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
			'padding': 3,
			'barSpacing': 1,
			'totalSpacing': 1,
			'lineSpacing': 0
		};
		this.dims.height = 100 - (this.dims.padding * 4);
		this.dims.width = 100 - (this.dims.padding * 2);
		this.lines = [];
		this.bars = [];
		this.barsWidth = 0;
		this.lines = [];
		


		/*=================================
		* public methods
		=================================*/
		
		this.update = function(metric) {

			var results = [],
				maxQty = 0;

			// reset lines and bars arrays
			root.lines = [];
			root.bars = [];


			/*
			* get size of object literal
			*/			
			var getObjectSize = function(obj) {
				var size = 0;
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						size++;
					}
				}
				return size;
			}


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
				var height = (percentage * root.dims.height) + .5;
				var yPos = root.dims.height - height;

				root.bars.push({
					'label': label,
					'height': height,
					'y': yPos
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
						pushBar(sets.selected[j].result.get().length, sets.selected[j].name);
					}
				}

			} else {
				if (metric === 'color') {
					results = combineResults('colors');
					var sLength = colors.list.length;

					/*
					* get monocolored and colorless
					*/
					for (var k = 0; k < sLength; k++) {
						pushBar(results[colors.list[k].name], colors.list[k].name);
						delete results[colors.list[k].name];
					}

					sLength = getObjectSize(results);

					/*
					* get multicolored
					*/
					for (var l = 1; l < 6; l++) {
						for (var key in results) {
							if (key.length == l) {
								pushBar(results[key], key);
							}
						}
					}

				} else if (metric === 'rarity') {
					results = combineResults('rarities');
					var sLength = rarities.list.length;

					for (var k = 0; k < sLength; k++) {
						pushBar(results[rarities.list[k].name], rarities.list[k].name);
					}

				} else if (metric === 'type') {
					results = combineResults('types');
					var sLength = types.list.length;

					for (var k = 0; k < sLength; k++) {
						pushBar(results[types.list[k].name], types.list[k].name);
					}

				} else if (metric === 'cmc') {
					results = combineResults('cmcs');
					var bottom = 0,
						top = 0;

					/*
					* find range of cmcs in results
					*/					
					for (var key in results) {
						if (!bottom) {
							bottom = key
						}
						if (top < key) {
							top = key;
						}
					}

					/*
					* override range if values present
					*/
					if (cmcs.lower || cmcs.upper) {
						if (cmcs.selected == 'equal') {
							bottom = cmcs.lower;
							top = cmcs.lower;
						}
						if (cmcs.selected == 'greater') {
							bottom = cmcs.lower;
							if (!top) {
								top = bottom;
							}
						} else if (cmcs.selected == 'lesser') {
							bottom = 0;
							top = cmcs.lower;
						} else if (cmcs.selected == 'between') {
							bottom = cmcs.lower;
							if (cmcs.upper) {
								top = cmcs.upper;
							} else {
								top = bottom;
							}
						}

					}
					
					top++;
					for (var k = bottom; k < top; k++) {
						if (results[k.toString()]) {
							pushBar(results[k], k);
						} else {
							pushBar(0, k);
						}
					}

				} else if (metric === 'rating') {
					results = combineResults('ratings');
					var sLength = ratings.list.length,
						bottom = 2,
						top = 15;

					/*
					* override range if values present
					*/
					if (ratings.lower !== '-' || ratings.upper !== '-') {
						if (ratings.selected == 'equal') {
							bottom = ratings.lower;
							top = ratings.lower;
						}
						if (ratings.selected == 'greater') {
							bottom = ratings.lower;
						} else if (ratings.selected == 'lesser') {
							top = ratings.lower;
						} else if (ratings.selected == 'between') {
							if (ratings.bottom !== '-') {
								bottom = ratings.lower;
							} else {
								bottom = 2;
							}
							if (ratings.upper !== '-') {
								top = ratings.upper;
							} else {
								top = 15;
							}
						}

					}

					/*
					* reverse ratings list
					*/
					var reverseList = ratings.list.slice(0, sLength);
					reverseList.splice(0, 1);
					reverseList.reverse();
					sLength--;

					// console.log('range: ' + bottom + ' - '  + top);

					for (var k = 0; k < sLength; k++) {
						if (reverseList[k].name >= bottom && reverseList[k].name <= top) {
							if (results[k.toString()]) {
								pushBar(results[k], reverseList[k].label);
							} else {
								pushBar(0, reverseList[k].label);
							}
						}
					}

				} else if (metric === 'abilities') {
					results = combineResults('abilities');
					var sLength,
						filtered = false;

					/*
					* use selected list if has values,
					* else use full list of abilities
					*/					
					if (abilities.selected.length) {
						sLength = abilities.selected.length;
						filtered = true;
					} else {
						sLength = abilities.list.length;
					}

					/*
					* if list is too large,
					* use abbreviations
					*/
					


					if (filtered) {
						for (var key in abilities.selected) {
							if (results[abilities.list[key].name]) {
								pushBar(results[abilities.list[key].name], abilities.list[key].name);
							} else {
								pushBar(0, abilities.list[key].name);
							}
						}
					} else {
						for (var k = 0; k < sLength; k++) {
							pushBar(results[abilities.list[k].name], abilities.list[k].name);
						}
					}					
				}
			}

			/*
			* if maxQty = 0, set to 1,
			* get line spacing depending on maxQty
			* and set number of lines and yPos
			*/
			if (!maxQty) {
				maxQty = 1;
			}

			root.dims.lineSpacing = root.dims.height / (maxQty + 1);

			for (var i = 0; i < maxQty; i++) {
				var yPos = root.dims.lineSpacing * (i + 1);
				root.lines.push({
					'label': maxQty - i,
					'y': yPos
				});
			}
			

			/*
			* get total spacing depending on number of bars
			* set bar width depending on number of bars
			*/
			root.dims.totalSpacing = (root.bars.length - 1) * root.dims.barSpacing;
			root.barsWidth = (root.dims.width - root.dims.totalSpacing) / root.bars.length;

			/*
			* for each bar
			* set starting x position
			*/
			for (i = 0; i < root.bars.length; i++) {
				var xPos = ((root.barsWidth + root.dims.barSpacing) * i) + root.dims.padding;
				root.bars[i].x = xPos;
				root.bars[i].labelX = xPos + (root.barsWidth / 2);
				root.bars[i].labelY = root.dims.height + (root.dims.padding * 2);
			}
		}
		
	});