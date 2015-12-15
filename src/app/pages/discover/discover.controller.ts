import { IComposer } from '../../services/composer.model';
import { IForm } from '../../services/form.model';
import { DefinitionService } from '../../services/definition.service';

export class DiscoverController {

	composers: IComposer[];
	forms: IForm[];
	
	/** @ngInject */
	constructor(
		private definitionService: DefinitionService
	) {
		definitionService.getForms().then((forms) => {
			this.forms = forms;
		});
		definitionService.getFeaturedComposers().then((composers) => {
			this.composers = composers.slice(0, 4);
		});
	}
}