import { IComposer } from '../../services/composer.model';
import { IForm } from '../../services/form.model';
import { DefinitionService } from '../../services/definition.service';

export class BrowseController {
	
	/** @ngInject */
	constructor(
		private definitionService: DefinitionService
	) { }
}