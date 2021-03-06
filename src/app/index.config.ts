/** @ngInject */
export function config($logProvider: angular.ILogProvider, toastrConfig: any, $mdThemingProvider: angular.material.IThemingProvider) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.closeButton = true;
  toastrConfig.progressBar = true;

  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
}
