import { IAccount } from '../../../services/account.model';
import { AccountService } from '../../../services/account.service';

export default function lbHomeBanner(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/components/home/banner/home-banner.html',
        controller: HomeBannerController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}

class HomeBannerController {

    account: IAccount;

    /** @ngInject */
    constructor(
        private accountService: AccountService
    ) {
        this.account = accountService.current();
    }

    openProfileEditor() {
        console.log('openProfileEditor');
    }
}