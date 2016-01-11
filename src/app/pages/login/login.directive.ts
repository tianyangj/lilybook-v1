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
        private $location: angular.ILocationService,
        private accountService: AccountService,
        private toastr: any
    ) { }

    logIn() {
        this.accountService.logIn(this.email, this.password).then(() => {
            if (this.$stateParams.redirect) {
                this.$state.go(decodeURIComponent(this.$stateParams.redirect));
            } else if (this.$stateParams.url) {
                this.$location.url(decodeURIComponent(this.$stateParams.url));
            } else {
                this.$state.go('app.home');
            }
        }).catch(() => {
            this.toastr.error('Invalid Email or Password.', 'Login Error');
        });
    }
}
