import { DefinitionService } from '../../services/definition.service';
import { IDifficulty } from '../../services/difficulty.model';

export function lbSelectDifficulty(): angular.IDirective {

	return {
		restrict: 'E',
		template: `
			<md-input-container>
        		<label>Difficulty & Level</label>
        		<md-select
					ng-model="ctrl.difficulty"
					ng-model-options="{trackBy: '$value.id'}"
					ng-change="ctrl.onChange()"
					md-on-open="ctrl.onOpen()">
					<md-option>All</md-option>
					<md-divider></md-divider>
          			<md-option ng-repeat="difficulty in ctrl.difficulties" ng-value="{{difficulty}}">{{difficulty.name}}</md-option>
        		</md-select>
      		</md-input-container>
		`,
		scope: {},
		controller: SelectDifficultyController,
		controllerAs: 'ctrl',
		bindToController: true
	};

}

/** @ngInject */
class SelectDifficultyController {

	difficulty: IDifficulty;
	difficulties: IDifficulty[];

	constructor(
		private $rootScope: angular.IRootScopeService,
		private $location: angular.ILocationService,
		private definitionService: DefinitionService
	) {
		const name = this.$location.search().level;
		if (name) {
			definitionService.getDifficulties().then((difficulties) => {
				this.difficulties = difficulties;
				this.difficulty = difficulties.find((difficulty) => {
					return difficulty.value.toUpperCase() === name.toUpperCase();
				});
			});
		}
	}

	onOpen() {
		if (!this.difficulties) {
			return this.definitionService.getDifficulties().then((difficulties) => {
				this.difficulties = difficulties;
			});
		}
	}

	onChange() {
		this.$location.search('level', this.difficulty.value);
		this.$rootScope.$broadcast('selectDifficultyChanged', this.difficulty);
	}
}
