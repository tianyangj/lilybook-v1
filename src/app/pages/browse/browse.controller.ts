import { IComposition } from '../../services/composition.model';
import { IComposer } from '../../services/composer.model';
import { IDifficulty } from '../../services/difficulty.model';
import { IForm } from '../../services/form.model';
import { ICompositionQuery, CompositionService } from '../../services/composition.service';

/** @ngInject */
export class BrowseController {

    compositions: IComposition[];

    constructor(
        private $rootScope: angular.IRootScopeService,
        private compositionService: CompositionService
    ) {
        $rootScope.$on('selectComposerChanged', (event: angular.IAngularEvent, composer: IComposer) => {
            console.log('composer changed', composer);
        });
        $rootScope.$on('selectFormChanged', (event: angular.IAngularEvent, form: IForm) => {
            console.log('form changed', form);
        });
        $rootScope.$on('selectDifficultyChanged', (event: angular.IAngularEvent, difficulty: IDifficulty) => {
            console.log('difficulty changed', difficulty);
        });
        $rootScope.$on('selectSortChanged', (event: angular.IAngularEvent, sort: any) => {
            console.log('sort changed', sort);
            this.getCompositions({ sortId: sort.value });
        });
    }

    private getCompositions(query: ICompositionQuery) {
        return this.compositionService.getCompositions(query).then((compositions: IComposition[]) => {
            console.log('compositions', compositions);
        });
    }
}
