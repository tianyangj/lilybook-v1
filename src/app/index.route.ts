/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      templateUrl: 'app/layouts/row.html',
      controller: 'AppController',
      controllerAs: 'appCtrl'
    })
    .state('app.splash', {
      url: '/',
      templateUrl: 'app/splash/splash.html'
    })
    .state('app.login', {
      url: '/login?redirect',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      data: { authNot: true }
    })
    .state('app.account', {
      url: '/account',
      templateUrl: 'app/account/account.html',
      data: { authRequired: true }
    })
    .state('app.home', {
      url: '/home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      data: { authRequired: true }
    });

  $urlRouterProvider.otherwise('/');
}
