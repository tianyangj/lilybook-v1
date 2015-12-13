import { IAccount } from './services/account.model';
import { AccountService } from './services/account.service';

export class AppController {

	account: IAccount;
	
	/** @ngInject */
	constructor(
		private $rootScope: angular.IRootScopeService,
		private accountService: AccountService
	) {
		this.account = this.accountService.current();

		this.$rootScope.$on('EVENT_LOGIN', (event, account: IAccount) => {
			this.account = account;
		});

		this.$rootScope.$on('EVENT_LOGIN', (event, account: IAccount) => {
			this.account = account;
		});

		this.$rootScope.$on('EVENT_LOGOUT', () => {
			this.account = null;
		});
	}
}