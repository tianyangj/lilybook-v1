import { AccountService } from './services/account.service';

/** @ngInject */
export function runBlock(
  $rootScope: angular.IRootScopeService,
  $state: angular.ui.IStateService,
  accountService: AccountService
) {

  Parse.initialize('fHO4LtJRfsdhQBBicYZpdpj3BQHHQCVEiDPkS4ZI', '3gzRyAZnxtQLn1IofC4Layn6cc487e4n5Jin6FzM');

  $rootScope.$on('$stateChangeStart', (event: angular.IAngularEvent, next: angular.ui.IState) => {
    const account = accountService.current();
    if (next.data && next.data.authRequired && !account) {
      event.preventDefault();
      $state.go('app.login', { redirect: next.name });
    }
    if (next.data && next.data.authNot && account) {
      event.preventDefault();
      $state.go('app.home');
    }
  });
}
