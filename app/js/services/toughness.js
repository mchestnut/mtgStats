'use strict'

angular.module('mtgStats.services')

	.service('toughness', function() {

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
		this.column = 'toughness';
		this.includes = false;
		this.fuzzy = false;
		this.blank = '';
		this.lower = this.blank;
		this.upper = this.blank;
		this.hideUpper = true;


		/*=================================
		* public methods
		=================================*/
		
	});