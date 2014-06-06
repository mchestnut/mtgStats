'use strict'

angular.module('myApp.services')

	.service('rarities', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.list = [
			{'label': 'Mythic', 'name': 'Mythic Rare'},
			{'label': 'Rare', 'name': 'Rare'},
			{'label': 'Uncommon', 'name': 'Uncommon'},
			{'label': 'Common', 'name': 'Common'},
			{'label': 'Basic Land', 'name': 'Land'}
		];
		this.selected = [];
		this.column = 'rarity';
		this.includes = 'any';
		this.fuzzy = false;


		/*=================================
		* public methods
		=================================*/
		
	});