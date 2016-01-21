export function lbHeaderMenu(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/components/lbHeaderMenu/lbHeaderMenu.html',
        controller: HeaderMenuController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}

class HeaderMenuController {

}
