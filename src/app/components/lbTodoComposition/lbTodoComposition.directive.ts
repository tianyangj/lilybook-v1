import { AccountService } from '../../services/account.service';
import { ActivityService } from '../../services/activity.service';
import { IAccount } from '../../services/account.model';
import { IActivity, ActivityType } from '../../services/activity.model';
import { IComposition } from '../../services/composition.model';

export function lbTodoComposition(): angular.IDirective {

    return {
        restrict: 'E',
        template: `
            <md-button
                aria-label="Add Todo"
                class="md-raised md-primary"
                ng-click="ctrl.onAdd()">
                <span ng-if="!ctrl.todo">
                    <md-tooltip>Add to TODO List</md-tooltip>
                    <md-icon md-svg-src="assets/svg/ic_playlist_add.svg"></md-icon> Add TODO
                </span>
                <span ng-if="ctrl.todo">
                    <md-tooltip>Go to TODO List</md-tooltip>
                    <md-icon md-svg-src="assets/svg/ic_playlist_add_check.svg"></md-icon> In TODO
                </span>
            </md-button>
		`,
        scope: {
            composition: '='
        },
        controller: TodoCompositionController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}

class TodoCompositionController {

    composition: IComposition;
    todo: IActivity;
    account: IAccount;

    /** @ngInject */
    constructor(
        private $state: angular.ui.IStateService,
        private $location: angular.ILocationService,
        private activityService: ActivityService,
        private accountService: AccountService
    ) {
        this.account = accountService.current();
        this.activityService.read(
            ActivityType.Todo,
            this.accountService.current(),
            this.composition
        ).then((activity: IActivity) => {
            this.todo = activity;
        });
    }

    onAdd() {
        if (!this.todo) {
            this.activityService.create(
                ActivityType.Todo,
                this.account,
                this.composition,
                { progress: 0 }
            ).then((todo: IActivity) => {
                this.todo = todo;
            }).catch((error: any) => {
                if (error === 'AUTH_REQUIRED') {
                    this.$state.go('app.login', { url: this.$location.path() });
                }
            });
        } else {
            this.$state.go('app.home');
        }
    }
}
