'use strict';

angular.module('mtgStats.services')

	.service('sets', function($http, $rootScope, abilities) {

		/*=================================
		* private properties
		=================================*/
		
		var root = this;


		/*=================================
		* public properties
		=================================*/

		this.list = [
			'M15',
			'JOU',
			'BNG',
			'THS'
		];
		this.selected = [
			{
				'name': 'M15',
				'data': null,
				'abilities': [],
				'rarities': {},
				'result': null,
				'metrics': {
					'sets': [],
					'colors': [],
					'rarities': [],
					'types': [],
					'cmcs': [],
					'power': [],
					'toughness': [],
					'ratings': [],
					'abilities': []
				}
			},
			{
				'name': 'M15',
				'data': null,
				'abilities': [],
				'rarities': {},
				'result': null,
				'metrics': {
					'sets': [],
					'colors': [],
					'rarities': [],
					'types': [],
					'cmcs': [],
					'power': [],
					'toughness': [],
					'ratings': [],
					'abilities': []
				}
			},
			{
				'name': 'M15',
				'data': null,
				'abilities': [],
				'rarities': {},
				'result': null,
				'metrics': {
					'sets': [],
					'colors': [],
					'rarities': [],
					'types': [],
					'cmcs': [],
					'power': [],
					'toughness': [],
					'ratings': [],
					'abilities': []
				}
			}
		];
		this.single = true;
		this.stored = [];


		/*=================================
		* public methods
		=================================*/

		this.toggleSingle = function() {
			if (root.single) {

				// store 2 sets
				root.stored[0] = root.selected[1];
				root.stored[1] = root.selected[2];
				root.selected.splice(1, 2);
				root.getData(root.selected[0]);

			} else {

				// restore 2 sets
				console.log('restore 2 sets');
				root.selected[1] = root.stored[0];
				root.selected[2] = root.stored[1];
				root.stored = [];

				for (var i = 0; i < root.selected.length; i++) {
					root.getData(root.selected[i]);
				}
			}
		};

		this.getData = function(selected) {

			var result = 'failure';

			$http.get('json/' + selected.name.toLowerCase() + '.json').success(function(data) {

				// store selected abilities
				var sLength = abilities.list.length,
					sArray = [];
				for (var s = 0; s < sLength; s++) {
					if (abilities.selected[s]) {
						sArray.push(abilities.list[s].name);
					}
				}
				sLength = sArray.length;

				while (abilities.selected.length > 0) {
					abilities.selected.pop();
				}

				while(abilities.list.length > 0) {
					abilities.list.pop();
				}		

				selected.data = TAFFY(JSON.stringify(data));
				selected.abilities = selected.data({'abilities': {'isArray': true}}).get();
				selected.data({'abilities': {'isArray': true}}).remove(false);

				for (var i = 0; i < root.selected.length; i++) {
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
								if (abilities.list[g].label == ability.label) {
									found = true;
								}
							}

							// if item is not found, push
							if (!found) {
								abilities.list.push({'label': ability.label, 'name': ability.label, 'abbr': ability.abbr});
							}
						}
					}
				}

				var raritiesObj = selected.data({'rarities': {'isObject': true}}).get();
				selected.rarities = raritiesObj[0].rarities;
				selected.data({'rarities': {'isObject': true}}).remove(false);

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
							abilities.selected[j] = true;
						}
					}
				}

				$rootScope.$broadcast('sets::getDataSuccess');
			});
		}

	});