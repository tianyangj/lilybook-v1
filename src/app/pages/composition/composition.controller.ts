import { IComposition } from '../../services/composition.model';
import { CompositionService } from '../../services/composition.service';

export class CompositionController {

    composition: IComposition;

    /** @ngInject */
    constructor(
        private $stateParams: any,
        private compositionService: CompositionService
    ) {
        this.compositionService.getComposition($stateParams.id).then((composition: IComposition) => {
            this.composition = composition;
            console.log(composition);
        });
    }
}
