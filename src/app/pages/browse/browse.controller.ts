
/** @ngInject */
export class BrowseController {

	constructor(
		private $rootScope: angular.IRootScopeService
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
		})
	}
}