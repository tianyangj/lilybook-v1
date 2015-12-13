import { AccountService } from '../services/account.service';

export class LoginController {

	email: string;
	password: string;
	
	/** @ngInject */
	constructor(
		private $state: angular.ui.IStateService,
		private $stateParams,
		private accountService: AccountService,
		private toastr: any
	) { }

	logIn() {
		this.accountService.logIn(this.email, this.password).then(() => {
			const next = this.$stateParams.redirect || 'app.home';
			this.$state.go(next);
		}).catch((error) => {
			this.toastr.error('Invalid Email or Password.', 'Login Error');
		});
	}
}