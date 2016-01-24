import { IAccount } from '../../../services/account.model';

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
        private $mdDialog: angular.material.IDialogService
    ) { }

    cancel() {
        this.$mdDialog.cancel();
    }

    save() {
        this.$mdDialog.hide(this.account);
    }
}
