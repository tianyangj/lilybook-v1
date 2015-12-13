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
    }, (error) => {
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
      }, (error) => {
        defer.reject(error);
      });
    return defer.promise;
  }

  logOut(): angular.IPromise<any> {
    const defer = this.$q.defer();
    Parse.User.logOut().then(() => {
      this.$rootScope.$emit('EVENT_LOGOUT');
      defer.resolve();
    }, (error) => {
      defer.reject(error);
    });
    return defer.promise;
  }

  current(): IAccount {
    return userMapper(Parse.User.current());
  }
}