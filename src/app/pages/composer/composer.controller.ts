import { IComposition } from '../../services/composition.model';
import { IComposer } from '../../services/composer.model';
import { IForm } from '../../services/form.model';
import { ICompositionQuery, CompositionService } from '../../services/composition.service';

export class ComposerController {

    composer: IComposer;
    compositions: IComposition[];
    query: ICompositionQuery = {};
    loading = false;

    /** @ngInject */
    constructor(
        private $stateParams: any,
        private $rootScope: angular.IRootScopeService,
        private compositionService: CompositionService
    ) {
        this.compositionService.getComposer($stateParams.vanity).then((composer: IComposer) => {
            this.composer = composer;
            _.extend(this.query, { composerId: composer.id });
            this.updateCompositions();
        });
        $rootScope.$on('selectFormChanged', (event: angular.IAngularEvent, form: IForm) => {
            _.extend(this.query, { formId: form.id });
            this.loading = true;
            this.updateCompositions();
        });
        $rootScope.$on('selectSortChanged', (event: angular.IAngularEvent, sort: any) => {
            _.extend(this.query, { sortId: sort.value });
            this.loading = true;
            this.updateCompositions();
        });
    }

    private updateCompositions = _.debounce(() => {
        // console.log('query', this.query);
        this.compositionService.getCompositions(this.query).then((compositions: IComposition[]) => {
            this.compositions = compositions;
            this.loading = false;
        });
    }, 600);
}
