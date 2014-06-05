'use strict'

angular.module('myApp.services')

	.service('cmcs', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.list = false;
		this.selected = 'equal';
		this.comparisons = [
			{'label': 'Equal To', 'name': 'equal'},
			{'label': 'Greater or Equal To', 'name': 'greater'},
			{'label': 'Less or Equal To', 'name': 'lesser'},
			{'label': 'Between', 'name': 'between'}
		];
		this.column = 'cmc';
		this.includes = false;
		this.fuzzy = false;
		this.lower = '';
		this.upper = '';
		this.hideUpper = true;


		/*=================================
		* public methods
		=================================*/
		
	});