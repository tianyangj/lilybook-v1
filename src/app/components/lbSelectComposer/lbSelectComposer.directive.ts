import { DefinitionService } from '../../services/definition.service';
import { IComposer } from '../../services/composer.model';

export function lbSelectComposer(): angular.IDirective {

	return {
		restrict: 'E',
		template: `
			<md-input-container>
        		<label>Composers</label>
        		<md-select
					ng-model="ctrl.composer"
					ng-model-options="{trackBy: '$value.id'}"
					ng-change="ctrl.onChange()"
					md-on-open="ctrl.onOpen()">
					<md-option>All</md-option>
					<md-divider></md-divider>
					<md-optgroup label="{{key}}" ng-repeat="(key, composers) in ctrl.composerGroups">
						<md-option ng-repeat="composer in composers" ng-value="{{composer}}">{{composer.fullname}}</md-option>
					</md-optgroup>
        		</md-select>
      		</md-input-container>
		`,
		scope: {},
		controller: SelectComposerController,
		controllerAs: 'ctrl',
		bindToController: true
	};

}

/** @ngInject */
class SelectComposerController {

	composer;
	composerGroups;

	constructor(
		private $rootScope: angular.IRootScopeService,
		private $location: angular.ILocationService,
		private definitionService: DefinitionService
	) {
		const name = this.$location.search().composer;
		if (name) {
			this.getComposerGroups().then((composerGroups) => {
				this.composerGroups = composerGroups;
				this.composer = composerGroups[name[0].toUpperCase()].find((composer) => {
					return composer.shortname.toUpperCase() === name.toUpperCase();
				});
			});
		}
	}

	onOpen() {
		if (!this.composerGroups) {
			return this.getComposerGroups().then((composerGroups) => {
				this.composerGroups = composerGroups;
			});
		}
	}

	onChange() {
		this.$location.search('composer', this.composer.shortname);
		this.$rootScope.$broadcast('selectComposerChanged', this.composer);
	}

	private getComposerGroups() {
		return this.definitionService.getComposers().then((composers) => {
			return composers.reduce((previous, current) => {
				const key = current.shortname[0].toUpperCase();
				if (previous[key]) {
					previous[key].push(current);
				} else {
					previous[key] = [current];
				}
				return previous;
			}, {});
		});
	}
}