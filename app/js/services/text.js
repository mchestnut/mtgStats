'use strict'

angular.module('myApp.services')

	.service('text', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.str = '';
		this.column = 'text';
		this.fuzzy = true;


		/*=================================
		* public methods
		=================================*/
		
		this.getQuery = function(svc) {
			var query = [],
				temp = {};

			temp['text'] = {'likenocase': svc.str};
			query.push(temp);

			console.log(query);
			return query;
		}
	});