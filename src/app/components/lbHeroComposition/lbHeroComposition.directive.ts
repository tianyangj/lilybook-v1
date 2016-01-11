export function lbHeroComposition(): angular.IDirective {
    return {
        restrict: 'E',
        templateUrl: 'app/components/lbHeroComposition/hero-composition.html',
        scope: {
            video: '='
        },
        replace: true,
        link: (scope: any, element: angular.IAugmentedJQuery) => {
            scope.close = () => {
                element.remove();
            };
        }
    };
}
