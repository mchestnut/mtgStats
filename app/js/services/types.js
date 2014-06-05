'use strict'

angular.module('myApp.services')

	.service('types', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.list = [
			{'label': 'Creature', 'name': 'Creature'},
			{'label': 'Planeswalker', 'name': 'Planeswalker'},
			{'label': 'Enchantment', 'name': 'Enchantment'},
			{'label': 'Artifact', 'name': 'Artifact'},
			{'label': 'Instant', 'name': 'Instant'},
			{'label': 'Sorcery', 'name': 'Sorcery'},
			{'label': 'Land', 'name': 'Land'}
		];
		this.selected = [];
		this.column = 'type';
		this.includes = 'any';
		this.fuzzy = true;


		/*=================================
		* public methods
		=================================*/
		
	});