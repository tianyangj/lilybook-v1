import { IAccount } from '../../../services/account.model';
import { AccountService } from '../../../services/account.service';
import ProfileEditorService from '../profile-editor/home-profile-editor.service';

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
        private accountService: AccountService,
        private profileEditorService: ProfileEditorService
    ) {
        this.account = accountService.current();
    }

    openProfileEditor(event: MouseEvent) {
        this.profileEditorService.show(event, this.account).then((account: IAccount) => {
            console.log('suc', account);
            this.account = account;
        }).catch(() => {
            console.log('fail');
        });
    }
}
