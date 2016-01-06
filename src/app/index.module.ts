/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { AppController } from './index.controller';
import { MainController } from './main/main.controller';
import { ComposerController } from './pages/composer/composer.controller';
import { CompositionController } from './pages/composition/composition.controller';
import { CompositionSheetController } from './pages/composition/sheet.controller';
import { GithubContributor } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { AccountService } from '../app/services/account.service';
import { CompositionService } from '../app/services/composition.service';
import { DefinitionService } from '../app/services/definition.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';
import { lbHeader } from '../app/components/lbHeader/lbHeader.directive';
import { lbSidenav } from '../app/components/lbSidenav/lbSidenav.directive';
import { lbSelectForm } from '../app/components/lbSelectForm/lbSelectForm.directive';
import { lbSelectDifficulty } from '../app/components/lbSelectDifficulty/lbSelectDifficulty.directive';
import { lbSelectComposer } from '../app/components/lbSelectComposer/lbSelectComposer.directive';
import { lbSelectSort } from '../app/components/lbSelectSort/lbSelectSort.directive';
import { lbHeroComposition } from '../app/components/lbHeroComposition/lbHeroComposition';
import lbBrowsePage from '../app/pages/browse/browse.directive';
import lbDiscoverPage from '../app/pages/discover/discover.directive';
import lbLoginPage from '../app/pages/login/login.directive';
import lbSignupPage from '../app/pages/signup/signup.directive';

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
    .service('compositionService', CompositionService)
    .service('definitionService', DefinitionService)
    .controller('AppController', AppController)
    .controller('MainController', MainController)
    .controller('ComposerController', ComposerController)
    .controller('CompositionController', CompositionController)
    .controller('CompositionSheetController', CompositionSheetController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey)
    .directive('lbHeader', lbHeader)
    .directive('lbHeroComposition', lbHeroComposition)
    .directive('lbSidenav', lbSidenav)
    .directive('lbSelectForm', lbSelectForm)
    .directive('lbSelectDifficulty', lbSelectDifficulty)
    .directive('lbSelectSort', lbSelectSort)
    .directive('lbSelectComposer', lbSelectComposer)
    .directive('lbBrowsePage', lbBrowsePage)
    .directive('lbDiscoverPage', lbDiscoverPage)
    .directive('lbLoginPage', lbLoginPage)
    .directive('lbSignupPage', lbSignupPage);
}
