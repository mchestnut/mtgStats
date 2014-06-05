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
		

	});