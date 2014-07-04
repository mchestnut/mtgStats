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

			for (var i = 0; i < 3; i++) {
				root.list = root.list.concat(sets.selected[i].result.get());
			}

			var lLength = root.list.length;

			for (var i = 0; i < lLength; i++) {
				var cost = root.list[i].cost;
				cost = cost.replace('10', '\u2000');
				cost = cost.replace('11', '\u2001');
				cost = cost.replace('12', '\u2002');
				cost = cost.replace('13', '\u2003');
				cost = cost.replace('14', '\u2004');
				cost = cost.replace('15', '\u2005');
				cost = cost.replace('16', '\u2006');
				cost = cost.replace('17', '\u2007');
				cost = cost.replace('18', '\u2008');
				cost = cost.replace('19', '\u2009');
				cost = cost.replace('20', '\u2010');
				root.list[i].cost = cost;
			};
		
			// console.log(root.list);
		}		
	});