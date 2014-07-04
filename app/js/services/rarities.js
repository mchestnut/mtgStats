'use strict'

angular.module('mtgStats.services')

	.service('rarities', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.list = [
			{'label': 'Common', 'name': 'Common'},
			{'label': 'Uncommon', 'name': 'Uncommon'},
			{'label': 'Rare', 'name': 'Rare'},
			{'label': 'Mythic', 'name': 'Mythic Rare'},
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