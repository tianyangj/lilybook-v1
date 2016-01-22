import { IComposition } from '../../services/composition.model';
import { IComposer } from '../../services/composer.model';
import { CompositionService } from '../../services/composition.service';

export default function lbComposerPage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/composer/composer.html',
        scope: {},
        controller: ComposerPageController,
        controllerAs: 'composerCtrl',
        bindToController: true,
        replace: true
    };
}

class ComposerPageController {

    composer: IComposer;
    compositionsByForm: { [index: string]: IComposition[] };

    /** @ngInject */
    constructor(
        private $stateParams: any,
        private $rootScope: angular.IRootScopeService,
        private compositionService: CompositionService
    ) {
        this.compositionService.getComposer($stateParams.vanity).then((composer: IComposer) => {
            this.composer = composer;
            this.compositionService.getCompositions({ composerId: composer.id }).then((compositions: IComposition[]) => {
                this.compositionsByForm = _.groupBy(compositions, (composition: IComposition) => {
                    return composition.form.name;
                });
            });
        });
    }

}
