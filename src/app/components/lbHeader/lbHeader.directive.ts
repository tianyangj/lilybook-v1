import { AccountService } from '../../services/account.service';

/** @ngInject */
export function lbHeader(): angular.IDirective {

  return {
    restrict: 'E',
    templateUrl: 'app/components/lbHeader/lbHeader.html',
    controller: HeaderController,
    controllerAs: 'headerCtrl',
    bindToController: true
  };

}

/** @ngInject */
class HeaderController {

  constructor(
    private $state: angular.ui.IStateService,
    private $mdSidenav: angular.material.ISidenavService,
    private accountService: AccountService
  ) { }

  toggleSidenav(sidenavId: string) {
    this.$mdSidenav(sidenavId).toggle();
  }

  logOut() {
    this.accountService.logOut().then(() => {
      this.$state.go('app.splash');
    });
  }
}
