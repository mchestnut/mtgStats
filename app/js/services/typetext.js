'use strict'

angular.module('mtgStats.services')

	.service('typeText', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.str = '';
		this.column = 'type';
		this.fuzzy = true;


		/*=================================
		* public methods
		=================================*/
		
		this.getQuery = function(svc) {
			var query = [],
				temp = {};

			temp['type'] = {'likenocase': svc.str};
			query.push(temp);

			console.log(query);
			return query;
		}
	});