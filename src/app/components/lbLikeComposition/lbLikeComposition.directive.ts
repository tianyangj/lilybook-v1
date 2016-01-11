import { AccountService } from '../../services/account.service';
import { ActivityService } from '../../services/activity.service';
import { IAccount } from '../../services/account.model';
import { IActivity, ActivityType } from '../../services/activity.model';
import { IComposition } from '../../services/composition.model';

export function lbLikeComposition(): angular.IDirective {

    return {
        restrict: 'E',
        template: `
            <md-button
			 aria-label="Like Composition"
			 class="md-raised md-primary"
			 ng-click="ctrl.onLike()">
                <span ng-if="!ctrl.like">
                    <md-tooltip>Click to Like</md-tooltip>
                    <md-icon md-svg-src="assets/svg/ic_thumb_up.svg"></md-icon> Like
                </span>
                <span ng-if="ctrl.like">
                    <md-tooltip>Click to Unlike</md-tooltip>
                    <md-icon md-svg-src="assets/svg/ic_check.svg"></md-icon> Liked
                </span>
			</md-button>
		`,
        scope: {
            composition: '='
        },
        controller: LikeCompositionController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}

class LikeCompositionController {

    composition: IComposition;
    like: IActivity;
    account: IAccount;

    /** @ngInject */
    constructor(
        private $state: angular.ui.IStateService,
        private $location: angular.ILocationService,
        private accountService: AccountService,
        private activityService: ActivityService
    ) {
        this.account = accountService.current();
        this.activityService.read(
            ActivityType.Like,
            this.accountService.current(),
            this.composition
        ).then((like: IActivity) => {
            this.like = like;
        });
    }

    onLike() {
        if (this.like) {
            this.activityService.delete(
                ActivityType.Like,
                this.account,
                this.composition
            ).then(() => {
                this.like = null;
            });
        } else {
            this.activityService.create(
                ActivityType.Like,
                this.account,
                this.composition
            ).then((like: IActivity) => {
                this.like = like;
            }).catch((error: any) => {
                if (error === 'AUTH_REQUIRED') {
                    this.$state.go('app.login', { url: this.$location.path() });
                }
            });
        }
    }
}
