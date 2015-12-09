import { AccountService } from '../services/account.service';

export class LoginController {

	email: string;
	password: string;
	
	/** @ngInject */
	constructor(private accountService: AccountService) { }

	logIn() {
		this.accountService.logIn(this.email, this.password).then(function(account) {
			console.log(account);
		}).catch(function(error) {
			console.log(error);
		});
	}
}