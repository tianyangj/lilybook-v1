export default function lbHomeTabs(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/components/home/tabs/home-tabs.html',
        controller: HomeTabsController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}

class HomeTabsController {

    /** @ngInject */
    constructor() {
        console.log('construcgtor');
    }
}
