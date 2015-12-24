import { IComposition } from '../../services/composition.model';
import { ICompositionQuery, CompositionService } from '../../services/composition.service';

/** @ngInject */
export class BrowseController {

	compositions: IComposition[];

	constructor(
		private $rootScope: angular.IRootScopeService,
		private compositionService: CompositionService
	) {
		$rootScope.$on('selectComposerChanged', (event, composer) => {
			console.log('composer changed', composer)
		})
		$rootScope.$on('selectFormChanged', (event, form) => {
			console.log('form changed', form)
		})
		$rootScope.$on('selectDifficultyChanged', (event, difficulty) => {
			console.log('difficulty changed', difficulty)
		})
		$rootScope.$on('selectSortChanged', (event, sort) => {
			console.log('sort changed', sort)
			this.getCompositions({ sortId: sort.value });
		})
	}

	private getCompositions(query: ICompositionQuery) {
		return this.compositionService.getCompositions(query).then((compositions) => {
			console.log('compositions', compositions);
		});
	}
}