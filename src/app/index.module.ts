/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { AppController } from './index.controller';
import { MainController } from './main/main.controller';
import { CompositionController } from './pages/composition/composition.controller';
import { CompositionSheetController } from './pages/composition/sheet.controller';
import { GithubContributor } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { AccountService } from '../app/services/account.service';
import { ActivityService } from '../app/services/activity.service';
import { CompositionService } from '../app/services/composition.service';
import { DefinitionService } from '../app/services/definition.service';
import ProfileEditorService from '../app/components/home/profile-editor/home-profile-editor.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';
import { lbHeader } from '../app/components/lbHeader/lbHeader.directive';
import { lbHeaderMenu } from '../app/components/lbHeaderMenu/lbHeaderMenu.directive';
import { lbSidenav } from '../app/components/lbSidenav/lbSidenav.directive';
import { lbSelectForm } from '../app/components/lbSelectForm/lbSelectForm.directive';
import { lbSelectDifficulty } from '../app/components/lbSelectDifficulty/lbSelectDifficulty.directive';
import { lbSelectComposer } from '../app/components/lbSelectComposer/lbSelectComposer.directive';
import { lbSelectSort } from '../app/components/lbSelectSort/lbSelectSort.directive';
import { lbHeroComposition } from '../app/components/lbHeroComposition/lbHeroComposition.directive';
import { lbLikeComposition } from '../app/components/lbLikeComposition/lbLikeComposition.directive';
import { lbTodoComposition } from '../app/components/lbTodoComposition/lbTodoComposition.directive';
import lbAccountPage from '../app/pages/account/account.directive';
import lbBrowsePage from '../app/pages/browse/browse.directive';
import lbComposerPage from '../app/pages/composer/composer.directive';
import lbDiscoverPage from '../app/pages/discover/discover.directive';
import lbHomePage from '../app/pages/home/home.directive';
import lbLoginPage from '../app/pages/login/login.directive';
import lbSignupPage from '../app/pages/signup/signup.directive';
import lbSplashPage from '../app/pages/splash/splash.directive';
import lbHomeBanner from '../app/components/home/banner/home-banner.directive';
import lbHomeTabs from '../app/components/home/tabs/home-tabs.directive';
import lbVanity from '../app/components/home/profile-editor/vanity-validator.directive';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module lilybook {
    'use strict';

    angular.module('lilybook', ['ngAnimate', 'ngSanitize', 'ngAria', 'ui.router', 'ngMaterial', 'toastr', 'youtube-embed'])
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .config(config)
        .config(routerConfig)
        .run(runBlock)
        .service('githubContributor', GithubContributor)
        .service('webDevTec', WebDevTecService)
        .service('accountService', AccountService)
        .service('activityService', ActivityService)
        .service('compositionService', CompositionService)
        .service('definitionService', DefinitionService)
        .service('profileEditorService', ProfileEditorService)
        .controller('AppController', AppController)
        .controller('MainController', MainController)
        .controller('CompositionController', CompositionController)
        .controller('CompositionSheetController', CompositionSheetController)
        .directive('acmeNavbar', acmeNavbar)
        .directive('acmeMalarkey', acmeMalarkey)
        .directive('lbHeader', lbHeader)
        .directive('lbHeaderMenu', lbHeaderMenu)
        .directive('lbHeroComposition', lbHeroComposition)
        .directive('lbLikeComposition', lbLikeComposition)
        .directive('lbTodoComposition', lbTodoComposition)
        .directive('lbSidenav', lbSidenav)
        .directive('lbSelectForm', lbSelectForm)
        .directive('lbSelectDifficulty', lbSelectDifficulty)
        .directive('lbSelectSort', lbSelectSort)
        .directive('lbSelectComposer', lbSelectComposer)
        .directive('lbHomeBanner', lbHomeBanner)
        .directive('lbHomeTabs', lbHomeTabs)
        .directive('lbVanity', lbVanity)
        .directive('lbAccountPage', lbAccountPage)
        .directive('lbBrowsePage', lbBrowsePage)
        .directive('lbComposerPage', lbComposerPage)
        .directive('lbDiscoverPage', lbDiscoverPage)
        .directive('lbHomePage', lbHomePage)
        .directive('lbLoginPage', lbLoginPage)
        .directive('lbSignupPage', lbSignupPage)
        .directive('lbSplashPage', lbSplashPage);
}
