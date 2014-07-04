'use strict'

angular.module('mtgStats.services')

	.service('colors', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.list = [
			{'label': 'White', 'name': 'W'},
			{'label': 'Blue', 'name': 'U'},
			{'label': 'Black', 'name': 'B'},
			{'label': 'Red', 'name': 'R'},
			{'label': 'Green', 'name': 'G'},
			{'label': 'Colorless', 'name': 'C'}
		];
		this.selected = [];
		this.column = 'cost';
		this.includes = 'any';
		this.fuzzy = true;
		this.group = false;


		/*=================================
		* public methods
		=================================*/
		
	});