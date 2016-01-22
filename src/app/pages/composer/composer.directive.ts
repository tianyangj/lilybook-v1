import { IComposition } from '../../services/composition.model';
import { IComposer } from '../../services/composer.model';
import { IForm } from '../../services/form.model';
import { ICompositionQuery, CompositionService } from '../../services/composition.service';

export default function lbComposerPage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/composer/composer1.html',
        scope: {},
        controller: ComposerPageController,
        controllerAs: 'composerCtrl',
        bindToController: true,
        replace: true
    };
}

class ComposerPageController {

    composer: IComposer;
    compositions: IComposition[];
    compositionsByForm: { [index: string]: IComposition[] };
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
            this.loading = true;
            this.compositionService.getCompositions(this.query).then((compositions: IComposition[]) => {
                console.log(compositions);
                this.compositions = compositions;
                this.compositionsByForm = _.groupBy(compositions, (composition: IComposition) => {
                    return composition.form.name;
                });
                console.log(this.compositionsByForm)
                this.loading = false;
            });
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
