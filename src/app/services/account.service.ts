import { userMapper } from './mapper';
import { IAccount } from './account.model';

export class AccountService {

    /** @ngInject */
    constructor(
        private $q: angular.IQService,
        private $rootScope: angular.IRootScopeService
    ) { }

    signUp(email: string, password: string, firstname: string, lastname: string): angular.IPromise<IAccount> {
        const defer = this.$q.defer<IAccount>();
        Parse.User.signUp(email, password, {
            email: email,
            firstname: firstname,
            lastname: lastname
        }).then((user: Parse.User) => {
            const account = userMapper(user);
            this.$rootScope.$emit('EVENT_SIGNUP', account);
            defer.resolve(account);
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    logIn(email: string, password: string): angular.IPromise<IAccount> {
        const defer = this.$q.defer<IAccount>();
        Parse.User.logIn(email, password)
            .then((user: Parse.User) => {
                const account = userMapper(user);
                this.$rootScope.$emit('EVENT_LOGIN', account);
                defer.resolve(account);
            }, (error: Parse.Error) => {
                defer.reject(error);
            });
        return defer.promise;
    }

    logOut(): angular.IPromise<any> {
        const defer = this.$q.defer();
        Parse.User.logOut().then(() => {
            this.$rootScope.$emit('EVENT_LOGOUT');
            defer.resolve();
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    current(): IAccount {
        return userMapper(Parse.User.current());
    }

    createVanity(vanity: string) {
        const defer = this.$q.defer();
        const account = this.current();
        account.base.set('vanity', vanity);
        account.base.save(null, null, null).then((user: Parse.User) => {
            defer.resolve(userMapper(user));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    verifyVanity(vanity: string): angular.IPromise<any> {
        const defer = this.$q.defer();
        const query = new Parse.Query(Parse.User);
        query.equalTo('vanity', vanity);
        query.first().then((user: Parse.User) => {
            if (!user) {
                defer.resolve();
            } else {
                defer.reject();
            }
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }

    updateProfile(profile: any) {
        const defer = this.$q.defer();
        const account = this.current();
        account.base.set('profile', profile);
        account.base.save(null, null, null).then((user: Parse.User) => {
            defer.resolve(userMapper(user));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }
}
