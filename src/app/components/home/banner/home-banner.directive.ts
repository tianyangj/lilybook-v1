export default function lbHomeBanner(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/components/home/banner/home-banner.html',
        controller: HomeBannerController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}

class HomeBannerController {

}
