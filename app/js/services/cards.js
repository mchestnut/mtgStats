'use strict'

angular.module('myApp.services')

	.service('cards', function(sets) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/
		this.list = [];


		/*=================================
		* public methods
		=================================*/

		this.update = function() {
			
			/*
			* reset
			*/
			root.list = [];

			for (var i = 0; i < 3; i++) {
				root.list = root.list.concat(sets.selected[i].result.get());
			}
		
			// console.log(root.list);
		}		
	});