import { AccountService } from '../../services/account.service';

export default function lbSignupPage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/signup/signup.html',
        scope: {},
        controller: SignupPageController,
        controllerAs: 'signupCtrl',
        bindToController: true,
        replace: true
    };
}

class SignupPageController {

    email: string;
    password: string;
    firstname: string;
    lastname: string;

    /** @ngInject */
    constructor(
        private $state: angular.ui.IStateService,
        private $stateParams: any,
        private accountService: AccountService,
        private toastr: any
    ) { }

    signUp() {
        this.accountService.signUp(this.email, this.password, this.firstname, this.lastname).then(() => {
            const next = this.$stateParams.redirect || 'app.home';
            this.$state.go(next);
        }).catch((error: any) => {
            this.toastr.error(error.message, 'Error');
        });
    }
}
