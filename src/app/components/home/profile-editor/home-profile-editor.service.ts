import { IAccount } from '../../../services/account.model';
import { AccountService } from '../../../services/account.service';

export default class HomeProfileEditor {

    /** @ngInject */
    constructor(
        private $mdDialog: angular.material.IDialogService
    ) { }

    show(event: MouseEvent, account: IAccount) {
        return this.$mdDialog.show({
            clickOutsideToClose: true,
            targetEvent: event,
            templateUrl: 'app/components/home/profile-editor/home-profile-editor.html',
            locals: {
                account: angular.copy(account)
            },
            controller: ProfileEditorController,
            controllerAs: 'ctrl',
            bindToController: true
        });
    }
}

class ProfileEditorController {

    private account: IAccount;

    /** @ngInject */
    constructor(
        private $mdDialog: angular.material.IDialogService,
        private accountService: AccountService
    ) { }

    cancel() {
        this.$mdDialog.cancel();
    }

    save() {
        if (this.account.vanity) {
            this.accountService.createVanity(this.account.vanity);
        }
        if (this.account.profile) {
            this.accountService.updateProfile(this.account.profile);
        }
        this.$mdDialog.hide(this.account);
    }
}
