import { IComposition } from '../../services/composition.model';

export class CompositionController {

    /** @ngInject */
    constructor(
        private composition: IComposition
    ) {
        console.log(composition);
    }
}
