'use strict';

/* Services */


angular.module('myApp.services', [])

	/*###########################################
	* service to handle form fields
	###########################################*/
	
	.service('formsSvc', function() {

		/*=================================
		* method to compile query statement
		* from checkbox group
		=================================*/
		
		this.checkboxQuery = function(scope) {
			
			var query = [],
				included = [],
				includedStr = '',
				excluded = [],
				excludedStr = '',
				colorless = false,
				colors = '',
				regex = '',
				exactly = false,
				temp = {},
				oLength = scope.optionsList.length;

			if (scope.includes == 'any') {
				/*
				* if cost (color)
				* [{'cost': {'regex': /([\dX](?!.*[WUBRG]))|([WB])/}}]
				*/
				if (scope.column === 'cost') {

					for (var i = 0; i < oLength; i++) {
						if (scope.optionsModel[i]) {
							if (scope.optionsList[i].name === 'C') {
								colorless = true;
							} else {
								includedStr += scope.optionsList[i].name;
							}
						}
					}

					if (colorless && includedStr) {
						regex = new RegExp('([\\dX](?!.*[WUBRG]))|([' + includedStr + '])');
					} else if (colorless) {
						regex = new RegExp('[\\dX](?!.*[WUBRG])');
					} else if (includedStr) {
						regex = new RegExp('[' + includedStr + ']');
					}

					if (regex) {
						temp[scope.column] = {'regex': regex};
					}

				/*
				*  if any other column
				*  [{column: {'like': [name, name]}}]
				*/
				} else {
					for (var i = 0; i < oLength; i++) {
						if (scope.optionsModel[i]) {
							included.push(scope.optionsList[i].name);
						}
					}

					if (scope.fuzzy) {
						temp[scope.column] = {'like': included};
					} else {
						temp[scope.column] = included;
					}
				}

				if (included.length || includedStr.length || colorless) {
					query.push(temp);				
				}


			} else if (scope.includes == 'only') {
				/*
				* if cost (color)
				* [{'cost': {'regex': /([\dX](?!.*[WUBRG]))|([WB])(?!.*[URG]/}}]
				*/
				if (scope.column === 'cost') {

					for (var i = 0; i < oLength; i++) {
						if (scope.optionsModel[i]) {
							if (scope.optionsList[i].name === 'C') {
								colorless = true;
							} else {
								includedStr += scope.optionsList[i].name;
							}
						} else {
							if (scope.optionsList[i].name !== 'C') {
								excludedStr += scope.optionsList[i].name;
							}
						}
					}

					if (colorless && includedStr) {
						regex = new RegExp('([\\dX](?!.*[WUBRG]))|([' + includedStr + '])(?!.*[' + excludedStr + '])');
					} else if (colorless) {
						regex = new RegExp('[\\dX](?!.*[WUBRG])');
					} else if (includedStr) {
						regex = new RegExp('([' + includedStr + '])(?!.*[' + excludedStr + '])');
					}

					if (regex) {
						temp[scope.column] = {'regex': regex};
						query.push(temp);
					}

				/*
				*  if any other column
				*  [{column: {'like': [name, name]}}, {column: {'!like': name}}, {column: {'!like': name}}]
				*/
				} else {
					for (var i = 0; i < oLength; i++) {
						if (scope.optionsModel[i]) {
							included.push(scope.optionsList[i].name);
						} else {
							excluded.push(scope.optionsList[i].name);
						}
					}

					if (included.length) {
						if (scope.fuzzy) {
							temp[scope.column] = {'like': included};
							query.push(temp);

							var eLength = excluded.length;
							for (var j = 0; j < eLength; j++) {
								temp = {};
								temp[scope.column] = {'!like': excluded[j]};
								query.push(temp);
							}
						} else {
							temp[scope.column] = included;
							query.push(temp);

							var eLength = excluded.length;
							for (var j = 0; j < eLength; j++) {
								temp[scope.column] = {'!is': excluded[j]};
								query.push(temp);
							}
						}						
					}
				}


			} else if (scope.includes == 'exactly') {
				/*
				* if cost (color)
				* [{'cost': {'regex': /(?=.*W)(?=.*B)(?!.*[URG])/}}]
				*/
				if (scope.column === 'cost') {

					for (var i = 0; i < oLength; i++) {
						if (scope.optionsModel[i]) {
							if (scope.optionsList[i].name === 'C') {
								colorless = true;
							} else {
								includedStr += '(?=.*' + scope.optionsList[i].name + ')';
							}
						} else {
							if (scope.optionsList[i].name !== 'C') {
								excludedStr += scope.optionsList[i].name;
							}
						}
					}

					if (includedStr) {
						regex = new RegExp(includedStr + '(?!.*[' + excludedStr + '])');
					} else if (colorless) {
						regex = new RegExp('[\\dX](?!.*[WUBRG])');
					}

					if (regex) {
						temp[scope.column] = {'regex': regex};
					}

					console.log(regex);

					if (includedStr.length || colorless) {
						query.push(temp);					
					}

				/*
				*  if any other column
				* [{column: {'like': name]}, {'column': {'like': name}}, {'column': {'!like': name}}]
				}]
				*/
				} else {
					for (var i = 0; i < oLength; i++) {
						temp = {};
						
						if (scope.optionsModel[i]) {
							if (scope.fuzzy) {
								temp[scope.column] = {'like': scope.optionsList[i].name};
							} else {
								temp[scope.column] = scope.optionsList[i].name;
							}
							exactly = true;
							query.push(temp);
						} else {
							if (scope.fuzzy) {
								temp[scope.column] = {'!like': scope.optionsList[i].name};
							} else {
								temp[scope.column] = {'!is': scope.optionsList[i].name};
							}
							query.push(temp);
						}
					}

					if (!exactly) {
						query = {};
					}
				}
			};
			
			if (query.length === 0) {
				query = {};
			}

			// console.log(query);
			return query;
		}


		/*=================================
		* method to toggle upper range value
		* in a select group
		=================================*/
		
		this.selectToggle = function(scope) {
			if (scope.comparisonsModel === 'between') {
				scope.hideUpper = false;
			} else {
				scope.hideUpper = true;
			}
		}


		/*=================================
		* method to compile query statement
		* from select group
		=================================*/
		
		this.selectQuery = function(scope) {
			var query = [],
				temp = {};

			if (scope.lower && scope.lower != '-') {
				switch (scope.comparisonsModel) {
					case 'equal':
						temp[scope.column] = {'==': scope.lower};
						query.push(temp);
						break;

					case 'greater':
						temp[scope.column] = {'gte': scope.lower};
						query.push(temp);
						break;

					case 'lesser':
						temp[scope.column] = {'lte': scope.lower};
						query.push(temp);
						break;

					case 'between':
						if (scope.upper && scope.upper != '-') {

							/*
							* transpose values if necessary
							*/							
							if (scope.lower > scope.upper) {
								var lower = scope.upper,
									upper = scope.lower;

								scope.lower = lower;
								scope.upper = upper;
							}

							temp[scope.column] = {'gte': scope.lower};
							query.push(temp);
							temp = {};
							temp[scope.column] = {'lte': scope.upper};
							query.push(temp);
						}
						break;

					default:
						// do nothing
						break;
				}
			}

			// console.log(query);
			return query;
		}
	});