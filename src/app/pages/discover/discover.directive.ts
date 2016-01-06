import { IComposer } from '../../services/composer.model';
import { IForm } from '../../services/form.model';
import { DefinitionService } from '../../services/definition.service';

export default function lbDiscoverPage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/discover/discover.html',
        scope: {},
        controller: DiscoverPageController,
        controllerAs: 'discoverCtrl',
        bindToController: true,
        replace: true
    };
}

class DiscoverPageController {

    composers: IComposer[];
	forms: IForm[];

	/** @ngInject */
	constructor(
		private definitionService: DefinitionService
	) {
		definitionService.getForms().then((forms: IForm[]) => {
			this.forms = forms;
		});
		definitionService.getFeaturedComposers().then((composers: IComposer[]) => {
			this.composers = composers.slice(0, 4);
		});
	}
}
