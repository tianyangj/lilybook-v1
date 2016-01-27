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
    private vanity: string;

    /** @ngInject */
    constructor(
        private $q: angular.IQService,
        private $mdDialog: angular.material.IDialogService,
        private accountService: AccountService
    ) { }

    cancel() {
        this.$mdDialog.cancel();
    }

    save() {
        let promises = [];
        if (this.vanity) {
            promises.push(this.accountService.createVanity(this.vanity));
        }
        if (this.account.profile) {
            promises.push(this.accountService.updateProfile(this.account.profile));
        }
        this.$q.all(promises).then((responses: any) => {
            if (responses.length) {
                this.$mdDialog.hide(responses[0]);
            } else {
                this.$mdDialog.cancel();
            }
        });
    }
}
