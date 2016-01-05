import { IComposition } from '../../services/composition.model';
import { ISheet } from '../../services/sheet.model';
import { CompositionService } from '../../services/composition.service';

export class CompositionSheetController {

    sheet: ISheet;
    pdfUrl: string;

    /** @ngInject */
    constructor(
        private $sce: angular.ISCEService,
        private composition: IComposition,
        private compositionService: CompositionService
    ) {
        compositionService.getSheet(composition).then((sheet: ISheet) => {
            this.sheet = sheet;
            this.pdfUrl = $sce.trustAsResourceUrl('https://docs.google.com/viewer?embedded=true&url=' + sheet.pdfUrl);
        });
    }
}
