import { userMapper } from './mapper';

export interface IAccount {
  base: Parse.User,
  id: string,
  email: string,
  firstname: string,
  lastname: string
}

export class AccountService {

  /** @ngInject */
  constructor(private $q: angular.IQService) { };

  signUp(email: string, password: string, firstname: string, lastname: string): angular.IPromise<IAccount> {
    var defer = this.$q.defer<IAccount>();
    Parse.User.signUp(email, password, {
      email: email,
      firstname: firstname,
      lastname: lastname
    }).then((user: Parse.User) => {
      defer.resolve(userMapper(user));
    }, (error) => {
      defer.reject(error);
    });
    return defer.promise;
  }

  logIn(email: string, password: string): angular.IPromise<IAccount> {
    var defer = this.$q.defer<IAccount>();
    Parse.User.logIn(email, password)
      .then((user: Parse.User) => {
        defer.resolve(userMapper(user));
      }, (error) => {
        defer.reject(error);
      });
    return defer.promise;
  }

  logOut(): any {
    var defer = this.$q.defer();
    Parse.User.logOut().then(() => {
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