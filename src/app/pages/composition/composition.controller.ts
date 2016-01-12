import { IActivity, ActivityType } from '../../services/activity.model';
import { IComposition } from '../../services/composition.model';
import { ActivityService } from '../../services/activity.service';

export class CompositionController {

    likes: IActivity[];
    todos: IActivity[];
    average: number;

    /** @ngInject */
    constructor(
        private composition: IComposition,
        private activityService: ActivityService
    ) {
        activityService.list(composition).then((activities: IActivity[]) => {
            this.likes = activities.filter((activity: IActivity) => {
                return activity.type === ActivityType.Like;
            });
            this.todos = activities.filter((activity: IActivity) => {
                return activity.type === ActivityType.Todo;
            });
            var difficulties = activities.filter((activity: IActivity) => {
                return activity.type === ActivityType.Difficulty;
            }).map((activity: IActivity) => {
                return activity.meta.difficulty;
            });
            if (difficulties.length) {
                this.average = difficulties.reduce((a: number, b: number) => {
                    return a + b;
                }, 0) / difficulties.length;
            }
        });
    }
}
