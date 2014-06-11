'use strict'

angular.module('myApp.services')

	.service('abilities', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/
		
		this.list = [];
		this.selected = [];
		this.column = 'abilities';
		this.includes = 'any';
		this.fuzzy = true;


		/*=================================
		* public methods
		=================================*/
		
		this.cleanSelected = function() {
			var empty = true;

			for (var key in root.selected) {
				if (root.selected[key]) {
					empty = false;
				} else {
					delete root.selected[key];
				}
			}

			if (empty) {
				root.selected = [];
			}
		}

	});