export default function lbHomePage(): angular.IDirective {

    return {
        restrict: 'E',
        templateUrl: 'app/pages/home/home.html',
        scope: {},
        replace: true
    };
}
