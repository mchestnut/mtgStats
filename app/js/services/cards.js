'use strict'

angular.module('mtgStats.services')

	.service('cards', function(sets) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/
		this.list = [];


		/*=================================
		* public methods
		=================================*/

		this.update = function() {
			
			/*
			* reset
			*/
			root.list = [];

			for (var i = 0; i < sets.selected.length; i++) {
				root.list = root.list.concat(sets.selected[i].result.get());
			}

			var lLength = root.list.length;

			for (var i = 0; i < lLength; i++) {
				var displayCost = root.list[i].cost;
				displayCost = displayCost.replace('10', '\u2000');
				displayCost = displayCost.replace('11', '\u2001');
				displayCost = displayCost.replace('12', '\u2002');
				displayCost = displayCost.replace('13', '\u2003');
				displayCost = displayCost.replace('14', '\u2004');
				displayCost = displayCost.replace('15', '\u2005');
				displayCost = displayCost.replace('16', '\u2006');
				displayCost = displayCost.replace('17', '\u2007');
				displayCost = displayCost.replace('18', '\u2008');
				displayCost = displayCost.replace('19', '\u2009');
				displayCost = displayCost.replace('20', '\u2010');
				root.list[i].displayCost = displayCost;
			};
		
			// console.log(root.list);
		}		
	});