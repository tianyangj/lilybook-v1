import { AccountService } from '../../services/account.service';

export default function lbLoginPage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/login/login.html',
        scope: {},
        controller: LoginPageController,
        controllerAs: 'loginCtrl',
        bindToController: true,
        replace: true
    };
}

class LoginPageController {

    email: string;
    password: string;

    /** @ngInject */
    constructor(
        private $state: angular.ui.IStateService,
        private $stateParams: any,
        private accountService: AccountService,
        private toastr: any
    ) { }

    logIn() {
        this.accountService.logIn(this.email, this.password).then(() => {
            const next = this.$stateParams.redirect || 'app.home';
            this.$state.go(next);
        }).catch(() => {
            this.toastr.error('Invalid Email or Password.', 'Login Error');
        });
    }
}
