import { DefinitionService } from '../../services/definition.service';
import { IForm } from '../../services/form.model';

export function lbSelectForm(): angular.IDirective {

    return {
        restrict: 'E',
        template: `
			<md-input-container style="min-width:150px">
        		<label>Forms & Genres</label>
        		<md-select
					ng-model="ctrl.form"
					ng-model-options="{trackBy: '$value.id'}"
					ng-change="ctrl.onChange()"
					md-on-open="ctrl.onOpen()">
					<md-option>All</md-option>
					<md-divider></md-divider>
          			<md-option ng-repeat="form in ctrl.forms" ng-value="{{form}}">{{form.name}}</md-option>
        		</md-select>
      		</md-input-container>
		`,
        scope: {},
        controller: SelectFormController,
        controllerAs: 'ctrl',
        bindToController: true
    };

}

/** @ngInject */
class SelectFormController {

    form: IForm;
    forms: IForm[];

    constructor(
        private $rootScope: angular.IRootScopeService,
        private $location: angular.ILocationService,
        private definitionService: DefinitionService
    ) {
        const name = this.$location.search().form;
        if (name) {
            definitionService.getForms().then((forms: IForm[]) => {
                this.forms = forms;
                this.form = _.chain(forms).find((form: IForm) => {
                    return form.name.toUpperCase() === name.toUpperCase();
                }).value();
            });
        }
    }

    onOpen() {
        if (!this.forms) {
            return this.definitionService.getForms().then((forms: IForm[]) => {
                this.forms = forms;
            });
        }
    }

    onChange() {
        this.$location.search('form', this.form.name);
        this.$rootScope.$broadcast('selectFormChanged', this.form);
    }
}
