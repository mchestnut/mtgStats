'use strict'

angular.module('myApp.services')

	.service('ratings', function(formsSvc) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/
		
		this.list = [
			{'label': '-', 'name': '-'},
			{'label': 'A+', 'name': 15},
			{'label': 'A', 'name': 14},
			{'label': 'A-', 'name': 13},
			{'label': 'B+', 'name': 12},
			{'label': 'B', 'name': 11},
			{'label': 'B-', 'name': 10},
			{'label': 'C+', 'name': 9},
			{'label': 'C', 'name': 8},
			{'label': 'C-', 'name': 7},
			{'label': 'D+', 'name': 6},
			{'label': 'D', 'name': 5},
			{'label': 'D-', 'name': 4},
			{'label': 'F+', 'name': 2}
		];
		this.selected = 'equal';
		this.comparisons = [
			{'label': 'Equal To', 'name': 'equal'},
			{'label': 'Greater or Equal To', 'name': 'greater'},
			{'label': 'Less or Equal To', 'name': 'lesser'},
			{'label': 'Between', 'name': 'between'}
		];
		this.column = 'rating';
		this.includes = false;
		this.fuzzy = false;
		this.lower = '-';
		this.upper = '-';
		this.hideUpper = true;


		/*=================================
		* public methods
		=================================*/
		
	});