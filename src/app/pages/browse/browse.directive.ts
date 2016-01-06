import { IComposition } from '../../services/composition.model';
import { IComposer } from '../../services/composer.model';
import { IDifficulty } from '../../services/difficulty.model';
import { IForm } from '../../services/form.model';
import { ICompositionQuery, CompositionService } from '../../services/composition.service';

export default function lbBrowsePage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/browse/browse.html',
        scope: {},
        controller: BrowsePageController,
        controllerAs: 'browseCtrl',
        bindToController: true,
        replace: true
    };
}

class BrowsePageController {

    compositions: IComposition[];
    query: ICompositionQuery = {};
    loading = false;

    /** @ngInject */
    constructor(
        private $rootScope: angular.IRootScopeService,
        private compositionService: CompositionService
    ) {
        $rootScope.$on('selectComposerChanged', (event: angular.IAngularEvent, composer: IComposer) => {
            _.extend(this.query, { composerId: composer.id });
            this.loading = true;
            this.updateCompositions();
        });
        $rootScope.$on('selectFormChanged', (event: angular.IAngularEvent, form: IForm) => {
            _.extend(this.query, { formId: form.id });
            this.loading = true;
            this.updateCompositions();
        });
        $rootScope.$on('selectDifficultyChanged', (event: angular.IAngularEvent, difficulty: IDifficulty) => {
            _.extend(this.query, { difficultyId: difficulty.id });
            this.loading = true;
            this.updateCompositions();
        });
        $rootScope.$on('selectSortChanged', (event: angular.IAngularEvent, sort: any) => {
            _.extend(this.query, { sortId: sort.value });
            this.loading = true;
            this.updateCompositions();
        });
        this.loading = true;
        this.updateCompositions();
    }

    private updateCompositions = _.debounce(() => {
        // console.log('query', this.query);
        this.compositionService.getCompositions(this.query).then((compositions: IComposition[]) => {
            this.compositions = compositions;
            this.loading = false;
        });
    }, 600);
}
