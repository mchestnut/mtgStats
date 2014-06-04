'use strict'

angular.module('myApp.services')

	.service('abilities', function(formsSvc) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/
		
		this.list = [];
		this.model = [];
		this.column = 'abilities';
		this.includes = 'any';
		this.fuzzy = true;


		/*=================================
		* public methods
		=================================*/
		
		this.refresh = function() {
			
		}


	});