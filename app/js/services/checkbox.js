'use strict'

angular.module('mtgStats.services')

	.service('checkbox', function() {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/



		/*=================================
		* public methods
		=================================*/
		
		this.getQuery = function(svc) {
			var string = [],
				included = [],
				includedStr = '',
				excluded = [],
				excludedStr = '',
				colorless = false,
				colors = '',
				regex = '',
				exactly = false,
				temp = {},
				oLength = svc.list.length;

			if (svc.includes == 'any') {
				/*
				* if cost (color)
				* [{'cost': {'regex': /([\dX](?!.*[WUBRG]))|([WB])/}}]
				*/
				if (svc.column === 'cost') {

					for (var i = 0; i < oLength; i++) {
						if (svc.selected[i]) {
							if (svc.list[i].name === 'C') {
								colorless = true;
							} else {
								includedStr += svc.list[i].name;
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
						temp[svc.column] = {'regex': regex};
					}

				/*
				*  if any other column
				*  [{column: {'like': [name, name]}}]
				*/
				} else {
					for (var i = 0; i < oLength; i++) {
						if (svc.selected[i]) {
							included.push(svc.list[i].name);
						}
					}

					if (svc.fuzzy) {
						temp[svc.column] = {'like': included};
					} else {
						temp[svc.column] = included;
					}
				}

				if (included.length || includedStr.length || colorless) {
					string.push(temp);				
				}


			} else if (svc.includes == 'only') {
				/*
				* if cost (color)
				* [{'cost': {'regex': /([\dX](?!.*[WUBRG]))|(?=^{W|[^URGW]}{W|^{B|[^URGB]}{B)(?!.*[URG])/}}]
				*/
				if (svc.column === 'cost') {

					// get excludedStr
					for (var i = 0; i <oLength; i++) {
						if (!svc.selected[i] && svc.list[i].name !== 'C') {
							excludedStr += svc.list[i].name;
						}
					}

					// get includeStr
					for (var i = 0; i < oLength; i++) {
						if (svc.selected[i]) {
							if (svc.list[i].name === 'C') {
								colorless = true;
							} else {
								if (includedStr) {
									includedStr += '|';
								}
								includedStr += '^{' + svc.list[i].name + '|[^' + excludedStr + svc.list[i].name + ']}{' + svc.list[i].name;
							}
						}
					}

					if (colorless && includedStr) {
						regex = new RegExp('([\\dX](?!.*[WUBRG]))|(?=' + includedStr + ')(?!.*[' + excludedStr + '])');
					} else if (colorless) {
						regex = new RegExp('[\\dX](?!.*[WUBRG])');
					} else if (includedStr) {
						regex = new RegExp('(?=' + includedStr + ')(?!.*[' + excludedStr + '])');
					}

					if (regex) {
						temp[svc.column] = {'regex': regex};
						string.push(temp);
					}

				/*
				*  if any other column
				*  [{column: {'like': [name, name]}}, {column: {'!like': name}}, {column: {'!like': name}}]
				*/
				} else {
					for (var i = 0; i < oLength; i++) {
						if (svc.selected[i]) {
							included.push(svc.list[i].name);
						} else {
							excluded.push(svc.list[i].name);
						}
					}

					if (included.length) {
						if (svc.fuzzy) {
							temp[svc.column] = {'like': included};
							string.push(temp);

							var eLength = excluded.length;
							for (var j = 0; j < eLength; j++) {
								temp = {};
								temp[svc.column] = {'!like': excluded[j]};
								string.push(temp);
							}
						} else {
							temp[svc.column] = included;
							string.push(temp);

							var eLength = excluded.length;
							for (var j = 0; j < eLength; j++) {
								temp[svc.column] = {'!is': excluded[j]};
								string.push(temp);
							}
						}						
					}
				}


			} else if (svc.includes == 'exactly') {
				/*
				* if cost (color)
				* [{'cost': {'regex': /(?=^{W|.*[^URGW]}{W)(?=^{B|.*[^URGB]}{B)(?!.*[URG])/}}]
				*/
				if (svc.column === 'cost') {

					// get excludedStr
					for (var i = 0; i <oLength; i++) {
						if (!svc.selected[i] && svc.list[i].name !== 'C') {
							excludedStr += svc.list[i].name;
						}
					}

					// get includeStr
					for (var i = 0; i < oLength; i++) {
						if (svc.selected[i]) {
							if (svc.list[i].name === 'C') {
								colorless = true;
							} else {
								includedStr += '(?=^{' + svc.list[i].name + '|.*[^' + excludedStr + svc.list[i].name + ']}{' + svc.list[i].name + ')';
							}
						}
					}

					if (includedStr) {
						regex = new RegExp(includedStr + '(?!.*[' + excludedStr + '])');
					} else if (colorless) {
						regex = new RegExp('[\\dX](?!.*[WUBRG])');
					}

					if (regex) {
						temp[svc.column] = {'regex': regex};
					}

					if (includedStr.length || colorless) {
						string.push(temp);					
					}

				/*
				*  if any other column
				* [{column: {'like': name]}, {'column': {'like': name}}, {'column': {'!like': name}}]
				}]
				*/
				} else {
					for (var i = 0; i < oLength; i++) {
						temp = {};
						
						if (svc.selected[i]) {
							if (svc.fuzzy) {
								temp[svc.column] = {'like': svc.list[i].name};
							} else {
								temp[svc.column] = svc.list[i].name;
							}
							exactly = true;
							string.push(temp);
						} else {
							if (svc.fuzzy) {
								temp[svc.column] = {'!like': svc.list[i].name};
							} else {
								temp[svc.column] = {'!is': svc.list[i].name};
							}
							string.push(temp);
						}
					}

					if (!exactly) {
						string = {};
					}
				}
			};
			
			if (string.length === 0) {
				string = {};
			}

			// console.log(string);
			return string;
		}
	});