import { AccountService } from '../services/account.service';
import { IAccount } from '../services/account.model';

export class LoginController {

	email: string;
	password: string;
	
	/** @ngInject */
	constructor(
		private $state: angular.ui.IStateService,
		private accountService: AccountService,
		private toastr: any
	) { }

	logIn() {
		this.accountService.logIn(this.email, this.password).then((account: IAccount) => {
			this.toastr.success('Redirecting to Home...', 'Login Success', {
				closeButton: false,
				timeOut: 1000,
				onHidden: () => {
					this.$state.go('app.home');
				}
			});
		}).catch((error) => {
			this.toastr.error('Invalid Email or Password.', 'Login Error');
		});
	}
}