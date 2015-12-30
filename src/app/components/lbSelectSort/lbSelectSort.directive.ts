export function lbSelectSort(): angular.IDirective {
	return {
		restrict: 'E',
		template: `
			<md-input-container style="min-width:150px">
        		<label>Sort By</label>
        		<md-select
					ng-model="ctrl.sort"
					ng-model-options="{trackBy: '$value.value'}"
					ng-change="ctrl.onChange()">
					<md-option ng-repeat="sort in ctrl.sorts" ng-value="{{sort}}">{{sort.name}}</md-option>
        		</md-select>
      		</md-input-container>
		`,
		controller: SelectSortController,
		controllerAs: 'ctrl'
	};
}

/** @ngInject */
class SelectSortController {

	sort;
	sorts;

	constructor(
		private $rootScope: angular.IRootScopeService
	) {
		this.sorts = [
			{ value: 1, name: 'Alphabetical' },
			{ value: 2, name: 'Difficulty' },
			{ value: 3, name: 'Popularity' }
		];
		this.sort = this.sorts[0];
	}

	onChange() {
		this.$rootScope.$broadcast('selectSortChanged', this.sort);
	}
}
