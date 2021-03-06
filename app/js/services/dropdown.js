'use strict'

angular.module('mtgStats.services')

	.service('dropdown', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/



		/*=================================
		* public methods
		=================================*/

		this.toggleUpper = function(svc) {
			if (svc.selected === 'between') {
				svc.hideUpper = false;
			} else {
				svc.hideUpper = true;
				svc.upper = svc.blank;
			}
		}


		this.getQuery = function(svc) {
			var query = [],
				temp = {};

			if (svc.lower && svc.lower != '-') {
			switch (svc.selected) {
				case 'equal':
					temp[svc.column] = {'==': svc.lower};
					query.push(temp);
					break;

				case 'greater':
					temp[svc.column] = {'gte': svc.lower};
					query.push(temp);
					break;

				case 'lesser':
					temp[svc.column] = {'lte': svc.lower};
					query.push(temp);
					break;

				case 'between':
					if (svc.upper && svc.upper != '-') {
						/*
						* transpose values if necessary
						*/							
						if (parseInt(svc.lower) > parseInt(svc.upper)) {
							var lower = svc.upper,
								upper = svc.lower;

							svc.lower = lower;
							svc.upper = upper;
						}

						temp[svc.column] = {'gte': svc.lower};
						query.push(temp);
						temp = {};
						temp[svc.column] = {'lte': svc.upper};
						query.push(temp);
					}
					break;

				default:
					// do nothing
					break;
			}
		}

		// console.log(query);
		return query;
		}
		
	});