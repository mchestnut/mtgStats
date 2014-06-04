'use strict'

angular.module('myApp.services')

	.service('colors', function(formsSvc) {

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
		this.model = [];
		this.column = 'cost';
		this.includes = 'any';
		this.fuzzy = true;


		/*=================================
		* public methods
		=================================*/
		
	});