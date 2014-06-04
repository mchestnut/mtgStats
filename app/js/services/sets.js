'use strict';

angular.module('myApp.services')

	.service('sets', function($http, abilities) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		/*
		* list of available sets
		*/
		this.list = [
			'JOU',
			'BNG',
			'THS'
		]

		/*
		* sets selected by user/preselected
		*/
		this.selected = [
			{
				'name': 'JOU',
				'data': null,
				'abilities': [],
				'result': null
			},
			{
				'name': 'BNG',
				'data': null,
				'abilities': [],
				'result': null
			},
			{
				'name': 'THS',
				'data': null,
				'abilities': [],
				'result': null
			}
		];


		/*=================================
		* public methods
		=================================*/		

		this.getData = function(selected, scope) {

			$http.get('json/' + selected.name + '.json').success(function(data) {

				// store selected abilities
				var sLength = abilities.list.length,
					sArray = [];
				for (var s = 0; s < sLength; s++) {
					if (abilities.model[s]) {
						sArray.push(abilities.list[s].name);
					}
				}
				sLength = sArray.length;

				while (abilities.model.length > 0) {
					abilities.model.pop();
				}

				while(abilities.list.length > 0) {
					abilities.list.pop();
				}		

				selected.data = TAFFY(JSON.stringify(data));
				selected.abilities = selected.data({'abilities': {'isArray': true}}).get();
				selected.data({'abilities': {'isArray': true}}).remove(false);

				for (var i = 0; i < 3; i++) {
					if (root.selected[i].abilities.length) {									
						// get length of abilities list
						var aLength = root.selected[i].abilities[0].abilities.length;

						// for each item in list
						for (var j = 0; j < aLength; j++) {
							var ability = root.selected[i].abilities[0].abilities[j],
								gLength = abilities.list.length,
								found = false;

							// check is item already in shared list
							for (var g = 0; g < gLength; g++) {
								if (abilities.list[g].label == ability) {
									found = true;
								}
							}

							// if item is not found, push
							if (!found) {
								abilities.list.push({'label': ability, 'name': ability});
							}
						}
					}
				}

				// sort abilities alphabetically
				abilities.list.sort(function(a, b) {
					if (a.name > b.name) {
						return 1;
					} else if (a.name < b.name) {
						return -1;
					} else {
						return 0;
					}
				});


				aLength = abilities.list.length;

				// for each ability in stored abilities
				for (s = 0; s < sLength; s++) {
					// for each ability in abilities list
					for (j = 0; j < aLength; j++) {

						// if ability is stored, mark true to select
						if (sArray[s] == abilities.list[j].name) {
							abilities.model[j] = true;
						}
					}
				}

				scope.shared.abilitiesRefresh();
				scope.shared.queryLists();
			});
		}

	});