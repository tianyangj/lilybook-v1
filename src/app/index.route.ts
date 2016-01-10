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
      template: '<lb-splash-page></lb-splash-page>',
      data: { authNot: true }
    })
    .state('app.login', {
      url: '/login?redirect',
      template: '<lb-login-page></lb-login-page>',
      data: { authNot: true }
    })
    .state('app.signup', {
      url: '/signup?redirect',
      template: '<lb-signup-page></lb-signup-page>',
      data: { authNot: true }
    })
    .state('app.browse', {
      url: '/browse?form&level&composer',
      template: '<lb-browse-page></lb-browse-page>'
    })
    .state('app.discover', {
      url: '/discover',
      template: '<lb-discover-page></lb-discover-page>'
    })
    .state('app.composer', {
      url: '/composer/:vanity',
      template: '<lb-composer-page></lb-composer-page>'
    })
    .state('app.composition', {
      url: '/composition/:id',
      templateUrl: 'app/pages/composition/composition.html',
      controller: 'CompositionController',
      controllerAs: 'compositionCtrl',
      resolve: {
        composition: ['$stateParams', 'compositionService', ($stateParams: any, compositionService: any) => {
          return compositionService.getComposition($stateParams.id);
        }]
      }
    })
    .state('app.composition.videos', {
      url: '/videos',
      template: '<h1>videos</h1>'
    })
    .state('app.composition.sheets', {
      url: '/sheets',
      templateUrl: 'app/pages/composition/sheet.html',
      controller: 'CompositionSheetController',
      controllerAs: 'sheetCtrl'
    })
    .state('app.composition.qa', {
      url: '/qa',
      template: '<h1>qa</h1>'
    })
    .state('app.account', {
      url: '/account',
      template: '<lb-account-page></lb-account-page>',
      data: { authRequired: true }
    })
    .state('app.home', {
      url: '/home',
      template: '<lb-home-page></lb-home-page>',
      data: { authRequired: true }
    });

  $urlRouterProvider.otherwise('/');
}
