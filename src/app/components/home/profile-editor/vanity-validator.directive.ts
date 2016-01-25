import { AccountService } from '../../../services/account.service';

/** @ngInject */
export default function lbVanity($q: angular.IQService, accountService: AccountService): angular.IDirective {

    return {
        require: 'ngModel',
        link: (scope: any, element: JQuery, attrs: any, ctrl: any) => {
            ctrl.$asyncValidators.vanity = (vanity: string) => {
                if (ctrl.$isEmpty(vanity)) {
                    return $q.when();
                }
                return accountService.verifyVanity(vanity);
            };
        }
    };
}
