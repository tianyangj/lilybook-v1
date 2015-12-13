import { AccountService } from '../services/account.service';

export class SignupController {

	email: string;
	password: string;
	firstname: string;
	lastname: string;
	
	/** @ngInject */
	constructor(
		private $state: angular.ui.IStateService,
		private $stateParams,
		private accountService: AccountService,
		private toastr: any
	) { }

	signUp() {
		this.accountService.signUp(this.email, this.password, this.firstname, this.lastname).then(() => {
			const next = this.$stateParams.redirect || 'app.home';
			this.$state.go(next);
		}).catch((error) => {
			this.toastr.error(error.message, 'Error');
		});
	}
}