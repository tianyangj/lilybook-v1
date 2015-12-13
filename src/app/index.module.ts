/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { AppController } from './index.controller';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { GithubContributor } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { AccountService } from '../app/services/account.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';
import { lbHeader } from '../app/components/lbHeader/lbHeader.directive';
import { lbSidenav } from '../app/components/lbSidenav/lbSidenav.directive';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module lilybook {
  'use strict';

  angular.module('lilybook', ['ngAnimate', 'ngSanitize', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .service('accountService', AccountService)
    .controller('AppController', AppController)
    .controller('MainController', MainController)
    .controller('LoginController', LoginController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey)
    .directive('lbHeader', lbHeader)
    .directive('lbSidenav', lbSidenav);
}
