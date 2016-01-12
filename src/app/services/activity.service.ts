import { activityMapper } from './mapper';
import { ActivityType, IActivity } from './activity.model';
import { IAccount } from './account.model';
import { IComposition } from './composition.model';

export class ActivityService {

    private activityDB: Parse.Object;

    /** @ngInject */
    constructor(private $q: angular.IQService) {
        this.activityDB = Parse.Object.extend('Activity');
    };

    create(type: ActivityType, fromUser: IAccount, composition: IComposition, meta?: any): angular.IPromise<IActivity> {
        if (!fromUser) {
            return this.$q.reject('AUTH_REQUIRED');
        }
        var defer = this.$q.defer<IActivity>();
        Parse.Cloud.run('createActivity', {
            type: type,
            compositionId: composition.id,
            meta: meta
        }).then((response: Parse.Object) => {
            defer.resolve(activityMapper(response));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    read(type: ActivityType, fromUser: IAccount, composition: IComposition): angular.IPromise<IActivity> {
        if (!fromUser) {
            return this.$q.when(null);
        }
        var defer = this.$q.defer<IActivity>();
        Parse.Cloud.run('readActivity', {
            type: type,
            compositionId: composition.id
        }).then((response: Parse.Object) => {
            defer.resolve(activityMapper(response));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    update(type: ActivityType, fromUser: IAccount, composition: IComposition, meta?: any): angular.IPromise<IActivity> {
        if (!fromUser) {
            return this.$q.reject('AUTH_REQUIRED');
        }
        var defer = this.$q.defer<IActivity>();
        Parse.Cloud.run('updateActivity', {
            type: type,
            compositionId: composition.id,
            meta: meta
        }).then((response: Parse.Object) => {
            defer.resolve(activityMapper(response));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    delete(type: ActivityType, fromUser: IAccount, composition: IComposition): angular.IPromise<IActivity> {
        if (!fromUser) {
            return this.$q.reject('AUTH_REQUIRED');
        }
        var defer = this.$q.defer<IActivity>();
        Parse.Cloud.run('deleteActivity', {
            type: type,
            compositionId: composition.id
        }).then((response: Parse.Object) => {
            defer.resolve(activityMapper(response));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    count(composition: IComposition, type?: ActivityType): angular.IPromise<number> {
        var defer = this.$q.defer<number>();
        var query = new Parse.Query(this.activityDB);
        query.equalTo('composition', composition.base);
        if (type) {
            query.equalTo('type', type);
        }
        query.count().then((count: number) => {
            defer.resolve(count);
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    list(composition: IComposition, type?: ActivityType): angular.IPromise<IActivity[]> {
        var defer = this.$q.defer<IActivity[]>();
        var query = new Parse.Query(this.activityDB);
        query.equalTo('composition', composition.base);
        if (type) {
            query.equalTo('type', type);
        }
        query.find().then((response: Parse.Object[]) => {
            var activities = response.map(activityMapper);
            defer.resolve(activities);
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }
}
