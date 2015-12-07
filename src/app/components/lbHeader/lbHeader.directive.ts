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
  
  constructor(private $mdSidenav) { }
  
  toggleSidenav(sidenavId: string) {
    this.$mdSidenav(sidenavId).toggle();
  }
}